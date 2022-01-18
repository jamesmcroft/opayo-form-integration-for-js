import { TransactionStatus } from "./TransactionStatus";

/**
 * Defines an interface for the response message of a successful or failed Opayo transaction after decryption.
 */
export interface ITransactionResponse {
    VendorTxCode: string;
    VPSTxId: string;
    Status: TransactionStatus;
    StatusDetail: string;
    GiftAid: number;
    Amount: number;
}
