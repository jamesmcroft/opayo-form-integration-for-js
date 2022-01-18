import { ITransaction } from "./ITransaction";
import { ITransactionDetail } from "./ITransactionDetail";
import { ITransactionResponse } from "./ITransactionResponse";

/**
 * Defines an interface for initiating and handling an Opayo transaction.
 */
export interface ITransactionService {
    /**
     * A value indicating whether the transaction service is running against Opayo's test environment or live.
     */
    isTestEnvironment: boolean;

    /**
     * Initiates an Opayo transaction with the specified detail, vendor name, and Form Integration encryption password.
     * @param detail The details of the transaction to be initiated.
     * @param vendor The name of the Opayo vendor.
     * @param password The Form Integration encryption password.
     * @returns The constructed transaction transmitted to Opayo's Form Integration page.
     */
    initiateTransaction(detail: ITransactionDetail, vendor: string, encryptionPassword: string): Promise<ITransaction>;

    /**
     * Handles the response from Opayo's Form Integration page.
     * @param response The encrypted response from Opayo sent via the query string of the SuccessURL or FailureURL.
     * @param encryptionPassword The Form Integration encryption password.
     * @returns The decrypted response from Opayo's Crypt query string.
     */
    handleTransactionResponse(response: string, encryptionPassword: string): Promise<ITransactionResponse>;
}