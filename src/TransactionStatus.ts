/**
 * Defines the values associated with the status of a transaction after a successful or failed transaction attempt with Opayo.
 */
export enum TransactionStatus {
    /**
     * This value is present if the transaction was authorised.
     */
    OK = 'OK',
   
    /**
     * This value is present if the authorisation was failed by the bank.
     */
    NotAuthorised = 'NOTAUTHED',
  
    /**
     * This value is present if the user decided to click Cancel while on the Opayo payment pages.
     */
    Abort = 'ABORT',
  
    /**
     * This value is present if authorisation occurred, but your fraud screening rules were not met, or 3D authentication failed three times.
     */
    Rejected = 'REJECTED',
  
    /**
     * This value is present if an error has occurred at Opayo (these are infrequent, but your site should handle them anyway. They normally indicate a problem with authorisation). The StatusDetail field contains human readable description of the error message.
     */
    Error = 'ERROR',
  }
  