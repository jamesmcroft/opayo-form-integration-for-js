/**
 * Defines the values associated with the current transaction within a set of repeated transactions for the Opayo transaction details.
 */
export enum COFUsage {
    /**
     * The transaction is the first in the set of transactions.
     */
    First = 'FIRST',

    /**
     * The transaction is subsequent in the set of transactions.
     */
    Subsequent = 'SUBSEQUENT'
}
