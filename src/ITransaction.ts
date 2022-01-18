/**
 * Defines an interface for an object map for an Opayo transaction.
 */
export interface ITransactionMap {
    [key: string]: string;
}

/**
 * Defines an interface for the form data required for an Opayo transaction.
 */
export interface ITransaction extends ITransactionMap {
    /**
     * The protocol version for the Opayo message.
     */
    VPSProtocol: string;

    /**
     * The type of transaction being performed. In most cases this will be 'PAYMENT'.
     */
    TxType: string;

    /**
     * The unique identifier issued by Opayo for the transaction.
     */
    Vendor: string;

    /**
     * A field containing the encrypted/encoded details of the transaction to prevent customer tampering.
     */
    Crypt: string;
}
