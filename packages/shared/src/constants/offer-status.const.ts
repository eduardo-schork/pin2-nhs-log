export const OfferStatus = {
    OPENED: "Em aberto",
    IN_NEGOCIATION: "Em negociação",
    CANCELED: "Cancelado",
    APPROVED: "Aprovado",
    DISAPPROVED: "Reprovado",
} as const;

export type TOfferStatus = (typeof OfferStatus)[keyof typeof OfferStatus];
