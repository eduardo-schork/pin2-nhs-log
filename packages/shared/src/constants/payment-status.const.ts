export const PAYMENT_STATUS = {
    APPROVED: "Aprovado",
    DISAPPROVED: "Reprovado",
} as const;

export type TPaymentStatus = (typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS];
