import DeliveryAppointmentStatus from "../../../../models/DeliveryAppointmentStatus";

class SeedDeliveryAppointmentStatus {
    async execute(): Promise<boolean> {
        try {
            await DeliveryAppointmentStatus.bulkCreate([
                {
                    pk_delivery_appointment_status: 1,
                    das_status: "Coletada",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    pk_delivery_appointment_status: 2,
                    das_status: "A caminho",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    pk_delivery_appointment_status: 3,
                    das_status: "Entregue",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ]);
            return true;
        } catch (error) {
            return false;
        }
    }
}

export default new SeedDeliveryAppointmentStatus();
