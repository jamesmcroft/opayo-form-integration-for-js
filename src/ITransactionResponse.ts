import { TransactionStatus } from "./TransactionStatus";

export interface ITransactionResponse {
    VendorTxCode: string;
    VPSTxId: string;
    Status: TransactionStatus;
    StatusDetail: string;
    GiftAid: number;
    Amount: number;
}
