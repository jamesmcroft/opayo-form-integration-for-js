import { faker } from '@faker-js/faker';
import { TransactionService } from "../src/TransactionService";
import { transactionDetail } from "./fakers/TransactionDetailFaker";

describe("when initiating a transaction", () => {
    test.each([
        { key: "VendorTxCode", value: "", validationError: "required" },
        { key: "VendorTxCode", value: faker.string.sample(41), validationError: "length" },
        { key: "Amount", value: "", validationError: "required" },
        { key: "Amount", value: 0, validationError: "greater than" },
        { key: "Amount", value: 100001, validationError: "less than" },
        { key: "Currency", value: "", validationError: "required" },
        { key: "Description", value: "", validationError: "required" },
        { key: "Description", value: faker.string.sample(101), validationError: "length" },
        { key: "SuccessURL", value: "", validationError: "required" },
        { key: "SuccessURL", value: faker.string.sample(2001), validationError: "length" },
        { key: "FailureURL", value: "", validationError: "required" },
        { key: "FailureURL", value: faker.string.sample(2001), validationError: "length" },
        { key: "AcctId", value: "", validationError: "required" },
        { key: "AcctId", value: faker.string.sample(65), validationError: "length" },
        { key: "CustomerName", value: "", validationError: "required" },
        { key: "CustomerName", value: faker.string.sample(101), validationError: "length" },
        { key: "CustomerEMail", value: "", validationError: "required" },
        { key: "CustomerEMail", value: "jamescroft.co.uk", validationError: "email" },
        { key: "CustomerEMail", value: "thisismyextremelylongemailaddressthatapparentlyopayodoesnotlikeandthinksisinvalidbutmightnotbe@jamescroft.co.uk", validationError: "length" },
        { key: "BillingSurname", value: "", validationError: "required" },
        { key: "BillingSurname", value: faker.string.sample(21), validationError: "length" },
        { key: "BillingFirstnames", value: "", validationError: "required" },
        { key: "BillingFirstnames", value: faker.string.sample(21), validationError: "length" },
        { key: "BillingAddress1", value: "", validationError: "required" },
        { key: "BillingAddress1", value: faker.string.sample(51), validationError: "length" },
        { key: "BillingAddress2", value: faker.string.sample(51), validationError: "length" },
        { key: "BillingAddress3", value: faker.string.sample(51), validationError: "length" },
        { key: "BillingCity", value: "", validationError: "required" },
        { key: "BillingCity", value: faker.string.sample(41), validationError: "length" },
        { key: "BillingPostCode", value: "", validationError: "required" },
        { key: "BillingPostCode", value: faker.string.sample(11), validationError: "length" },
        { key: "BillingCountry", value: "", validationError: "required" },
        { key: "BillingCountry", value: faker.string.sample(3), validationError: "length" },
        { key: "DeliverySurname", value: "", validationError: "required" },
        { key: "DeliverySurname", value: faker.string.sample(21), validationError: "length" },
        { key: "DeliveryFirstnames", value: "", validationError: "required" },
        { key: "DeliveryFirstnames", value: faker.string.sample(21), validationError: "length" },
        { key: "DeliveryAddress1", value: "", validationError: "required" },
        { key: "DeliveryAddress1", value: faker.string.sample(51), validationError: "length" },
        { key: "DeliveryAddress2", value: faker.string.sample(51), validationError: "length" },
        { key: "DeliveryAddress3", value: faker.string.sample(51), validationError: "length" },
        { key: "DeliveryCity", value: "", validationError: "required" },
        { key: "DeliveryCity", value: faker.string.sample(41), validationError: "length" },
        { key: "DeliveryPostCode", value: "", validationError: "required" },
        { key: "DeliveryPostCode", value: faker.string.sample(11), validationError: "length" },
        { key: "DeliveryCountry", value: "", validationError: "required" },
        { key: "DeliveryCountry", value: faker.string.sample(3), validationError: "length" },

    ])
        ("should throw an error if the $key is not valid ($validationError)", async ({ key, value, validationError }) => {
            // Arrange  
            const transactionService = new TransactionService(true);

            var transaction = transactionDetail();
            transaction[key] = value;

            // Act & Assert
            try {
                await transactionService.initiateTransaction(transaction, 'opayotest', 'opayotest');
            } catch (e) {
                var message = (e as { message: string }).message;
                expect(message).toContain(validationError);
            }
        });

    it("should generate transaction", async () => {
        // Arrange
        const transactionService = new TransactionService(true);

        var transaction = transactionDetail();

        // Act
        var result = await transactionService.initiateTransaction(transaction, 'opayotest', 'opayotest');

        // Assert
        expect(result).toBeDefined();
        expect(result.VPSProtocol).toBe("3.00");
        expect(result.TxType).toBe("PAYMENT");
        expect(result.Vendor).toBe("opayotest");
        expect(result.Crypt).toBeDefined();
    });
});
