
export interface ITransactionMap {
    [key: string]: string;
}

export interface ITransaction extends ITransactionMap {
    VPSProtocol: string;
    TxType: string;
    Vendor: string;
    Crypt: string;
}
