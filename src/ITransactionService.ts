import { ITransaction } from "./ITransaction";
import { ITransactionDetail } from "./ITransactionDetail";
import { ITransactionResponse } from "./ITransactionResponse";

export interface ITransactionService {
    isTestEnvironment: boolean;

    initiateTransaction(detail: ITransactionDetail, vendor: string, encryptionPassword: string): Promise<ITransaction>;
    handleTransactionResponse(response: string, encryptionPassword: string): Promise<ITransactionResponse>;
}
