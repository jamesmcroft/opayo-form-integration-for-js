# Opayo Form Integration Library for JavaScript 

[![GitHub release](https://img.shields.io/github/release/jamesmcroft/opayo-form-integration-for-js.svg)](https://github.com/jamesmcroft/opayo-form-integration-for-js/releases)
[![npm](https://img.shields.io/npm/v/opayo-form-integration-for-js.svg)](https://www.npmjs.com/package/opayo-form-integration-for-js)
[![npm Downloads](https://img.shields.io/npm/dt/opayo-form-integration-for-js.svg)](https://www.npmjs.com/package/opayo-form-integration-for-js)
[![Build status](https://github.com/jamesmcroft/opayo-form-integration-for-js/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/jamesmcroft/opayo-form-integration-for-js/actions/workflows/ci.yml)
[![Twitter Followers](https://img.shields.io/twitter/follow/jamesmcroft?label=follow%20%40jamesmcroft&style=flat)](https://twitter.com/jamesmcroft)

The Opayo (formerly SagePay) Form Integration Library for JavaScript is a library that allows you to integrate with Opayo's hosted [Form Integration](https://www.opayo.co.uk/support/12/36/opayo-form#:~:text=Why%20choose%20Opayo%20Form%3F%20The%20Form%20integration%20is,from%20your%20shoppers%20on%20our%20hosted%20payment%20pages.) method with JavaScript applications. It provides the encryption and decryption logic for transaction details outlined in the Opayo documentation.

## Install

```sh
npm install opayo-form-integration-for-js
```

## Usage

### Initiating a payment

```js
import { TransactionService, ITransaction, ITransactionDetail } from 'opayo-form-integration-for-js';

var transactionService = new TransactionService();

var transactionDetail = {
    "VendorTxCode": "PaymentReference-1",
    "Amount": "10.00",
    "Currency": "GBP",
    "Description": "Test transaction",
    "SuccessURL": "https://www.example.com/success",
    "FailureURL": "https://www.example.com/failure",
    "CustomerName": "John Smith",
    "CustomerEMail": "john.smith@email.com",
    "BillingSurname": "Smith",
    "BillingFirstnames": "John",
    "BillingAddress1": "1 High Street",
    "BillingCity": "London",
    "BillingPostCode": "EC1N 2TD",
    "BillingCountry": "GB",
    "DeliverySurname": "Smith",
    "DeliveryFirstnames": "John",
    "DeliveryAddress1": "1 High Street",
    "DeliveryCity": "London",
    "DeliveryPostCode": "EC1N 2TD",
    "DeliveryCountry": "GB",
    } as ITransactionDetail;

/*
 * Initiate transaction will return the object that has been transmitted to Opayo's Form Integration page in case you need it for reference.
 * Calling this method will automatically submit the data to Opayo and redirect the user to Opayo's Form Integration page.
 */
var transaction = await transactionService.initiateTransaction(transactionDetail, "opayotest", "your_encryption_password") as ITransaction;
```

### Handling a response

```js
import { TransactionService, ITransactionResponse } from 'opayo-form-integration-for-js';

var transactionService = new TransactionService();

/*
 * You will first need to grab the crypt value from the query string of the return URL from Opayo's Form Integration page.
 * Passing that value into the `handleTransactionResponse` method will decrypt the response using your Opayo Form Integration encryption password and return it.
 */
var urlParams = new URLSearchParams(window.location.search);
var crypt = urlParams.get('crypt');
var response = await transactionService.handleTransactionResponse(crypt, "your_encryption_password") as ITransactionResponse;
```

## Contributing 🤝🏻

Contributions, issues and feature requests are welcome!

Feel free to check the [issues page](https://github.com/jamesmcroft/opayo-form-integration-for-js/issues). You can also take a look at the [contributing guide](https://github.com/jamesmcroft/opayo-form-integration-for-js/blob/main/CONTRIBUTING.md).

We actively encourage you to jump in and help with any issues!

## Support this project 💗

As many developers know, projects like this are built and maintained in spare time. If you find this project useful, please **Star** the repo.

## Author

👤 **James Croft**

* Website: https://www.jamescroft.co.uk
* Twitter: [@jamesmcroft](https://twitter.com/jamesmcroft)
* Github: [@jamesmcroft](https://github.com/jamesmcroft)
* LinkedIn: [@jmcroft](https://linkedin.com/in/jmcroft)

## License

This project is made available under the terms and conditions of the [MIT license](LICENSE).
