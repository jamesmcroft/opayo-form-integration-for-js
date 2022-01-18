import CryptoJS from "crypto-js";
import { AlphaNumericValidator, IValidatorMap, MaxLengthValidator, MaxValueValidator, MinValueValidator, RegexValidator, RequiredValidator, ValidatorArray } from "made-data-validation";
import { ITransaction } from "./ITransaction";
import { ITransactionDetail } from "./ITransactionDetail";
import { ITransactionResponse } from "./ITransactionResponse";
import { ITransactionService } from "./ITransactionService";

/**
 * Defines a service for initiating and handling an Opayo transaction.
 */
export class TransactionService implements ITransactionService {
    isTestEnvironment: boolean;

    private validators: IValidatorMap = {
        "VendorTxCode": new ValidatorArray(() => { }, new RequiredValidator(), new MaxLengthValidator(40)),
        "Amount": new ValidatorArray(() => { }, new RequiredValidator(), new MinValueValidator(0.01), new MaxValueValidator(100000)),
        "Currency": new ValidatorArray(() => { }, new RequiredValidator(), new MaxLengthValidator(3)),
        "Description": new ValidatorArray(() => { }, new RequiredValidator(), new MaxLengthValidator(100)),
        "SuccessURL": new ValidatorArray(() => { }, new RequiredValidator(), new MaxLengthValidator(2000)),
        "FailureURL": new ValidatorArray(() => { }, new RequiredValidator(), new MaxLengthValidator(2000)),
        "CustomerName": new ValidatorArray(() => { }, new MaxLengthValidator(100)),
        "CustomerEMail": new ValidatorArray(() => { }, new MaxLengthValidator(80)),
        "VendorEMail": new ValidatorArray(() => { }, new MaxLengthValidator(80)),
        "EmailMessage": new ValidatorArray(() => { }, new MaxLengthValidator(7500)),
        "BillingSurname": new ValidatorArray(() => { }, new RequiredValidator(), new MaxLengthValidator(20)),
        "BillingFirstnames": new ValidatorArray(() => { }, new RequiredValidator(), new MaxLengthValidator(20)),
        "BillingAddress1": new ValidatorArray(() => { }, new RequiredValidator(), new MaxLengthValidator(50)),
        "BillingAddress2": new ValidatorArray(() => { }, new MaxLengthValidator(50)),
        "BillingAddress3": new ValidatorArray(() => { }, new MaxLengthValidator(50)),
        "BillingCity": new ValidatorArray(() => { }, new RequiredValidator(), new MaxLengthValidator(40)),
        "BillingPostCode": new ValidatorArray(() => { }, new RequiredValidator(), new MaxLengthValidator(10)),
        "BillingCountry": new ValidatorArray(() => { }, new RequiredValidator(), new MaxLengthValidator(2)),
        "BillingState": new ValidatorArray(() => { }, new MaxLengthValidator(2)),
        "BillingPhone": new ValidatorArray(() => { }, new MaxLengthValidator(19)),
        "DeliverySurname": new ValidatorArray(() => { }, new RequiredValidator(), new MaxLengthValidator(20)),
        "DeliveryFirstnames": new ValidatorArray(() => { }, new RequiredValidator(), new MaxLengthValidator(20)),
        "DeliveryAddress1": new ValidatorArray(() => { }, new RequiredValidator(), new MaxLengthValidator(50)),
        "DeliveryAddress2": new ValidatorArray(() => { }, new MaxLengthValidator(50)),
        "DeliveryAddress3": new ValidatorArray(() => { }, new MaxLengthValidator(50)),
        "DeliveryCity": new ValidatorArray(() => { }, new RequiredValidator(), new MaxLengthValidator(40)),
        "DeliveryPostCode": new ValidatorArray(() => { }, new RequiredValidator(), new MaxLengthValidator(10)),
        "DeliveryCountry": new ValidatorArray(() => { }, new RequiredValidator(), new MaxLengthValidator(2)),
        "DeliveryState": new ValidatorArray(() => { }, new MaxLengthValidator(2)),
        "DeliveryPhone": new ValidatorArray(() => { }, new MaxLengthValidator(19)),
        "Basket": new ValidatorArray(() => { }, new MaxLengthValidator(7500)),
        "BasketXML": new ValidatorArray(() => { }, new MaxLengthValidator(20000)),
        "CustomerXML": new ValidatorArray(() => { }, new MaxLengthValidator(2000)),
        "VendorData": new ValidatorArray(() => { }, new MaxLengthValidator(200)),
        "ReferrerID": new ValidatorArray(() => { }, new MaxLengthValidator(40)),
        "Language": new ValidatorArray(() => { }, new MaxLengthValidator(2)),
        "Website": new ValidatorArray(() => { }, new MaxLengthValidator(100)),
        "FIRecipientAcctNumber": new ValidatorArray(() => { }, new AlphaNumericValidator(), new MaxLengthValidator(10)),
        "FIRecipientSurname": new ValidatorArray(() => { }, new MaxLengthValidator(20)),
        "FIRecipientDoB": new ValidatorArray(() => { }, new RegexValidator(/(\d{8})/), new MaxLengthValidator(8)),
        "AcctID": new ValidatorArray(() => { }, new MaxLengthValidator(64)),
        "InitiatedType": new ValidatorArray(() => { }, new RequiredValidator()),
        "RecurringExpiry": new ValidatorArray(() => { }, new RegexValidator(/(\d{4})-(\d{2})-(\d{2})/), new MaxLengthValidator(10)),
        "RecurringFrequency": new ValidatorArray(() => { }, new RegexValidator(/^\d+$/), new MaxLengthValidator(4)),
        "PurchaseInstalData": new ValidatorArray(() => { }, new RegexValidator(/^\d+$/), new MaxLengthValidator(3)),
    }

    constructor(isTestEnvironment: boolean) {
        this.isTestEnvironment = isTestEnvironment;
    }

    initiateTransaction(detail: ITransactionDetail, vendor: string, encryptionPassword: string): Promise<ITransaction> {
        var transaction = {
            VPSProtocol: "3.00",
            TxType: "PAYMENT",
            Vendor: vendor,
            Crypt: this.encryptDetail(detail, encryptionPassword),
        } as ITransaction;

        this.submitTransaction(transaction);

        return Promise.resolve(transaction);
    }

    handleTransactionResponse(response: string, encryptionPassword: string): Promise<ITransactionResponse> {
        return Promise.resolve(this.decryptTransaction(response, encryptionPassword));
    }

    private submitTransaction(transaction: ITransaction) {
        var url = this.isTestEnvironment ? "https://test.sagepay.com/gateway/service/vspform-register.vsp" : "https://live.sagepay.com/gateway/service/vspform-register.vsp";

        var formInputsHtml = "";

        for (var key in transaction) {
            if (transaction.hasOwnProperty(key)) {
                formInputsHtml += `<input type='hidden' name='${key}' value='${transaction[key]}'></input>`;
            }
        }

        if (document) {
            var form = document.createElement("form");
            form.setAttribute("method", "post");
            form.setAttribute("action", url);
            form.innerHTML = formInputsHtml;
            document.body.appendChild(form);

            try {
                form?.submit();
            } catch (error) {
                console.log(error);
            }
        }
    }

    private encryptDetail(detail: ITransactionDetail, encryptionPassword: string): string {
        // This value will always need to be submitted as CIT for a Form integration (as the customer is always in session).
        detail.InitiatedType = "CIT";

        this.validateTransaction(detail);

        var cipher = CryptoJS.AES.encrypt(this.toTransactionDetailString(detail), CryptoJS.enc.Utf8.parse(encryptionPassword), {
            iv: CryptoJS.enc.Utf8.parse(encryptionPassword),
            padding: CryptoJS.pad.Pkcs7,
            mode: CryptoJS.mode.CBC
        });

        return `@${cipher.toString(CryptoJS.format.Hex).toUpperCase()}`;
    }

    private decryptTransaction(encryptedTransaction: string, encryptionPassword: string) {
        var decrypted = CryptoJS.AES.decrypt(encryptedTransaction.substring(1), CryptoJS.enc.Utf8.parse(encryptionPassword), {
            iv: CryptoJS.enc.Utf8.parse(encryptionPassword),
            padding: CryptoJS.pad.Pkcs7,
            mode: CryptoJS.mode.CBC,
            format: CryptoJS.format.Hex
        });

        return this.toTransactionResponse(decrypted.toString(CryptoJS.enc.Utf8));
    }

    private validateTransaction(detail: ITransactionDetail) {
        for (var key in detail) {
            if (this.validators.hasOwnProperty(key)) {
                var validator = this.validators[key];
                validator.validate(detail[key]);
                if (validator.isInvalid()) {
                    throw { success: false, message: `Transaction ${key} validation failed. ${validator.feedbackMessages().join(" ")}`, data: detail }
                }
            }
        }
    }

    private toTransactionDetailString(detail: ITransactionDetail) {
        var strings = [];
        for (var key in detail) {
            if (detail.hasOwnProperty(key)) {
                if (detail[key] !== null && detail[key] !== undefined) {
                    strings.push(key + "=" + detail[key]);
                }
            }
        }

        return strings.join("&");
    }

    private toTransactionResponse(response: string) {
        var keyValues = response.split("&");
        var result = {} as any;
        keyValues.forEach(kvp => {
            var parts = kvp.split("=");
            result[parts[0]] = parts[1];
        });

        return result as ITransactionResponse;
    }
}

