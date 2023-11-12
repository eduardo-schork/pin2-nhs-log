import PaymentType from "../../../../models/PaymentType";

class SeedPaymentType {
    async execute(): Promise<any> {
        try {
            await PaymentType.bulkCreate([
                {
                    pk_payment_type: 1,
                    pt_type: "Cartão de crédito",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    pk_payment_type: 2,
                    pt_type: "PIX",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                
            ]).then(() => {
                console.log("Registros inseridos com sucesso.");
            });
        } catch (error) {
            console.log({ error });
        }
    }
}

export default new SeedPaymentType();
