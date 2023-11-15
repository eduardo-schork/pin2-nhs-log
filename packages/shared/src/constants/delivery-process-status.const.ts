export const DELIVERY_PROCESS_STATUS = {
    CREATED: "Criada",
    SCHEDULED_COLLECTION: "Coleta agendada",
    INVOICED: "Faturado",
    COLLECTED: "Coletada",
    ON_WAY: "A caminho",
    DELIVERED: "Entregue",
    DELIVERY_CONFIRMED: "Entrega confirmada",
} as const;

export type TDeliveryProcessStatus =
    (typeof DELIVERY_PROCESS_STATUS)[keyof typeof DELIVERY_PROCESS_STATUS];
