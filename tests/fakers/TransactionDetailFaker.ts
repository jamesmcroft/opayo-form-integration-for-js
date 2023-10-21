import { faker } from '@faker-js/faker';
import { ITransactionDetail } from "../../src/ITransactionDetail";

export const transactionDetail = (): ITransactionDetail => {
    return {
        VendorTxCode: faker.string.uuid(),
        Amount: faker.finance.amount(0.01, 100000),
        Currency: "GBP",
        Description: faker.string.sample(100),
        SuccessURL: faker.internet.url(),
        FailureURL: faker.internet.url(),
        CustomerName: faker.person.fullName(),
        CustomerEMail: faker.internet.email(),
        VendorEMail: faker.internet.email(),
        BillingSurname: faker.person.lastName(),
        BillingFirstnames: faker.person.firstName(),
        BillingAddress1: faker.location.streetAddress(false),
        BillingAddress2: faker.location.secondaryAddress(),
        BillingAddress3: faker.location.street(),
        BillingCity: faker.location.city(),
        BillingPostCode: faker.location.zipCode(),
        BillingCountry: faker.location.countryCode(),
        DeliverySurname: faker.person.lastName(),
        DeliveryFirstnames: faker.person.firstName(),
        DeliveryAddress1: faker.location.streetAddress(false),
        DeliveryAddress2: faker.location.secondaryAddress(),
        DeliveryAddress3: faker.location.street(),
        DeliveryCity: faker.location.city(),
        DeliveryPostCode: faker.location.zipCode(),
        DeliveryCountry: faker.location.countryCode(),
    } as ITransactionDetail;
}