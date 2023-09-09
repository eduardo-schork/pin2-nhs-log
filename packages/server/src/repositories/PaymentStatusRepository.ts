import PaymentStatus from "../models/PaymentStatus";

class PaymentStatusRepo {
    async createPaymentStatus(): Promise<void> {
        try {
            await PaymentStatus.bulkCreate([
                {
                    pk_payment_status: 1,
                    ps_status: 'Aprovado',
                },
                {
                    pk_payment_status: 2,
                    ps_status: 'Reprovado',
                }
            ]);
            // return true;
        } catch (error) {
            // return false;
            console.log(error)
        }
    }
}

export default new PaymentStatusRepo();