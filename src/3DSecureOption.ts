/**
 * Defines the values associated with the 3D Secure Options for the Opayo transaction details.
 */
export enum SecureOption {
    /**
     * If 3D-Secure checks are possible and rules allow, perform the checks and apply the authorisation rules. (default)
     */
    AutoCheck = 0,

    /**
     * Force 3D-Secure challenge flow if possible and apply rules for authorisation.
     */
    ForceCheckWithRules = 1,

    /**
     * Do not perform 3D-Secure checks for this transaction and always authorise.
     */
    ForceNoCheck = 2,

    /**
     * Force 3D-Secure checks for this transaction if possible but ALWAYS send for authorisation, irrespective of rule base and if the cardholder has failed authentication.
     */
    ForceCheckWithMandatoryAuth = 3,
}
