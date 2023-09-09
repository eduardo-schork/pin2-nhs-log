import DeliveryProcessStatus from "../models/DeliveryProcessStatus";

class DeliveryProcessStatusRepo {
    async createDeliveryProcessStatus(): Promise<boolean> {
        try {
            await DeliveryProcessStatus.bulkCreate([
                {
                    pk_delivery_process_status: 1,
                    dps_status: 'Criada',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    pk_delivery_process_status: 2,
                    dps_status: 'Coleta Agendada',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    pk_delivery_process_status: 3,
                    dps_status: 'Faturado',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    pk_delivery_process_status: 4,
                    dps_status: 'Coletada',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    pk_delivery_process_status: 5,
                    dps_status: 'A caminho',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    pk_delivery_process_status: 6,
                    dps_status: 'Entregue',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    pk_delivery_process_status: 7,
                    dps_status: 'Entrega confirmada',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }
            ]);
            return true;
        } catch (error) {
            return false;
        }
    }
}

export default new DeliveryProcessStatusRepo();