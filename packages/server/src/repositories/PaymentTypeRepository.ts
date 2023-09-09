import PaymentType from "../models/PaymentType";

class PaymentTypeRepo {
    async createPaymentTypes(): Promise<boolean> {
        try {
            await PaymentType.bulkCreate([
                {
                    pk_payment_type: 1,
                    pt_type: 'PIX',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    pk_payment_type: 2,
                    pt_type: 'Cartão de crédito',
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

export default new PaymentTypeRepo();
