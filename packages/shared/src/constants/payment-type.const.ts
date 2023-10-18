export const PAYMENT_TYPE = {
    PIX: "PIX",
    CREDIT_CARD: "Cartão de crédito",
} as const;

export type TPaymentType = (typeof PAYMENT_TYPE)[keyof typeof PAYMENT_TYPE];
