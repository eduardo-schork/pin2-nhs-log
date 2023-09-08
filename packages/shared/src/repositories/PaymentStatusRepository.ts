import PaymentStatus from "../models/PaymentStatus";

class PaymentStatusRepo {
    async createPaymentStatus(): Promise<boolean> {
        try {
            await PaymentStatus.bulkCreate([
                {
                    pk_payment_status: 1,
                    ps_status: 'Aprovado',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    pk_payment_status: 2,
                    ps_status: 'Reprovado',
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

export default PaymentStatusRepo;