/**
 * Defines the values associated with the 3D Secure exception indicator for the Opayo transaction details.
 */
export enum ExceptionIndicator {
    LowValueTransaction = '01',
    TRAExemption = '02',
    TrustedBeneficiaries = '03',
    SecureCorporatePayment = '04',
    DelegatedAuthentication = '05',
}
