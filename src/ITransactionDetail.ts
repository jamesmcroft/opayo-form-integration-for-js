import { SecureOption } from "./3DSecureOption";
import { ExceptionIndicator } from "./3DSExceptionIndicator";
import { AVSCV2Option } from "./AVSCV2Option";
import { COFUsage } from "./COFUsage";
import { MITType } from "./MITType";
import { SendEmailOption } from "./SendEmailOption";
import { TransactionType } from "./TransactionType";

/**
 * Defines an interface for an object map for the details of an Opayo transaction.
 */
export interface ITransactionDetailMap {
    [key: string]: any;
}

/**
 * Defines an interface for the details of an Opayo transaction to be encrypted.
 */
export interface ITransactionDetail extends ITransactionDetailMap {
    VendorTxCode: string;
    Amount: string;
    Currency: string;
    Description: string;
    SuccessURL: string;
    FailureURL: string;
    CustomerName: string | null;
    CustomerEMail: string | null;
    VendorEMail: string | null;
    SendEMail: SendEmailOption | null;
    EmailMessage: string | null;
    BillingSurname: string;
    BillingFirstnames: string;
    BillingAddress1: string;
    BillingAddress2: string | null;
    BillingAddress3: string | null;
    BillingCity: string;
    BillingPostCode: string;
    BillingCountry: string;
    BillingState: string | null;
    BillingPhone: string | null;
    DeliverySurname: string;
    DeliveryFirstnames: string;
    DeliveryAddress1: string;
    DeliveryAddress2: string | null;
    DeliveryAddress3: string | null;
    DeliveryCity: string;
    DeliveryPostCode: string;
    DeliveryCountry: string;
    DeliveryState: string | null;
    DeliveryPhone: string | null;
    Basket: string | null;
    AllowGiftAid: boolean | null;
    ApplyAVSCV2: AVSCV2Option | null;
    Apply3DSecure: SecureOption | null;
    BasketXML: string | null;
    CustomerXML: string | null;
    VendorData: string | null;
    ReferrerID: string | null;
    Language: string | null;
    Website: string | null;
    FIRecipientAcctNumber: string | null;
    FIRecipientSurname: string | null;
    FIRecipientPostcode: string | null;
    FIRecipientDoB: string | null;
    AcctInfoXML: string | null;
    AcctID: string | null;
    MerchantRiskIndicatorXML: string | null;
    TransType: TransactionType | null;
    ThreeDSExemptionIndicator: ExceptionIndicator | null;
    COFUsage: COFUsage | null;
    InitiatedType: string;
    MITType: MITType | null;
    RecurringExpiry: string | null;
    RecurringFrequency: number | null;
    PurchaseInstalData: number | null;
}
