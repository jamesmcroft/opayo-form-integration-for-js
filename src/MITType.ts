/**
 * Defines the values associated with the reauthorisation of a transaction if the InitiatedType is MIT for the Opayo transaction details.
 */
export enum MITType {
    /**
     * A single purchase of goods or services paid for over multiple payments.
     */
    Instalment = 'INSTALMENT',

    /**
     * A purchase of goods or services provided at fixed regular intervals not exceeding one year between transactions.
     */
    Recurring = 'RECURRING',

    /**
     * A purchase of goods or services provided at irregular intervals with a fixed or variable amount.
     */
    Unscheduled = 'UNSCHEDULED',

    /**
     * An additional purchase made after an initial or estimated authorisation. For example; room service is added to the cardholders stay. This is only available for certain MCCs, such as hotels and car rental companies.
     */
    Incremental = 'INCREMENTAL',

    /**
     * An additional charge made after original services are rendered. For example; a parking fine. This is only available for certain MCCs, such as car rental companies.
     */
    DelayedCharge = 'DELAYEDCHARGE',

    /**
     * A charge for services where the cardholder entered into an agreement to purchase, but did not meet the terms of the agreement.
     */
    NoShow = 'NOSHOW',

    /**
     * A further purchase is made after the original purchase. For example; extended stays or rentals. This can also be used in split shipment scenarios.
     */
    Reauthorisation = 'REAUTHORISATION',

    /**
     * An authorisation request has been declined due to insufficient funds, DeclineCode=51, at the time the goods or services have already provided.
     */
    Resubmission = 'RESUBMISSION',
}
