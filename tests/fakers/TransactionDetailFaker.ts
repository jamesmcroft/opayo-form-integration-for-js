import faker from "faker";
import { ITransactionDetail } from "../../src/ITransactionDetail";

export const fakeTransactionDetail = (): ITransactionDetail => {
    return {
        VendorTxCode: faker.datatype.uuid(),
        Amount: faker.finance.amount(0.01, 100000),
        Currency: "GBP",
        Description: faker.datatype.string(100),
        SuccessURL: faker.internet.url(),
        FailureURL: faker.internet.url(),
        CustomerName: faker.name.findName(),
        CustomerEMail: faker.internet.email(),
        VendorEMail: faker.internet.email(),
        BillingSurname: faker.name.lastName(),
        BillingFirstnames: faker.name.firstName(),
        BillingAddress1: faker.address.streetAddress(false),
        BillingAddress2: faker.address.secondaryAddress(),
        BillingAddress3: faker.address.streetName(),
        BillingCity: faker.address.city(),
        BillingPostCode: faker.address.zipCode(),
        BillingCountry: faker.address.countryCode(),
        DeliverySurname: faker.name.lastName(),
        DeliveryFirstnames: faker.name.firstName(),
        DeliveryAddress1: faker.address.streetAddress(false),
        DeliveryAddress2: faker.address.secondaryAddress(),
        DeliveryAddress3: faker.address.streetName(),
        DeliveryCity: faker.address.city(),
        DeliveryPostCode: faker.address.zipCode(),
        DeliveryCountry: faker.address.countryCode(),
    } as ITransactionDetail;
}