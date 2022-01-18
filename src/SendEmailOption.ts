/**
 * Defines the values associated with the sending of an email post transaction for the Opayo transaction details.
 */
export enum SendEmailOption {
  /**
   * Do not send either customer or vendor emails.
   */
  DoNotSend = 0,

  /**
   * Send customer and vendor emails if addresses are provided.
   */
  SendIfProvided = 1,

  /**
   * Send vendor email but NOT the customer email.
   */
  SendVendorOnly = 2,
}
