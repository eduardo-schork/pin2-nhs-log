export const ITEM_REMITTANCE_TYPE = {
    DOCUMENTS: "Documentos",
    FLAMMABLE: "Inflamável",
    ELECTRONICS: "Eletrônicos",
    FRAGILE: "Frágil",
} as const;

export type TItemRemittanceType = (typeof ITEM_REMITTANCE_TYPE)[keyof typeof ITEM_REMITTANCE_TYPE];
