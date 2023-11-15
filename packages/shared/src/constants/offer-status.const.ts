export const OFFER_STATUS = {
    OPENED: "Em aberto",
    IN_NEGOCIATION: "Em negociação",
    CANCELED: "Cancelado",
    APPROVED: "Aprovado",
    DISAPPROVED: "Reprovado",
} as const;

export type TOfferStatus = (typeof OFFER_STATUS)[keyof typeof OFFER_STATUS];
