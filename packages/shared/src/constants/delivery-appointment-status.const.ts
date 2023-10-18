export const DELIVERY_APPOINTMENT_STATUS = {
    COLLECTED: "Coletada",
    ON_WAY: "A caminho",
    DELIVERED: "Entregue",
} as const;

export type TDeliveryAppointmentStatus =
    (typeof DELIVERY_APPOINTMENT_STATUS)[keyof typeof DELIVERY_APPOINTMENT_STATUS];
