export enum AVSCV2Option {
    /**
     * If AVS/CV2 enabled then check them. If rules apply, use rules (default).
     */
    AutoCheck = 0,

    /**
     * Force AVS/CV2 checks even if not enabled for the account. If rules apply, use rules.
     */
    ForceCheckWithRules = 1,

    /**
     * Force NO AVS/CV2 checks even if enabled on account.
     */
    ForceNoCheck = 2,

    /**
     * Force AVS/CV2 checks even if not enabled for the account but DON’T apply any rules.
     */
    ForceCheckNoRules = 3,
}
