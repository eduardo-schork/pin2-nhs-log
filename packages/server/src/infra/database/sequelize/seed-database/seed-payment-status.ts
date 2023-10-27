import PaymentStatus from "../../../../models/PaymentStatus";

class SeedPaymentStatus {
    async execute(): Promise<void> {
        try {
            await PaymentStatus.bulkCreate([
                {
                    pk_payment_status: 1,
                    ps_status: "Aprovado",
                },
                {
                    pk_payment_status: 2,
                    ps_status: "Reprovado",
                },
            ]);
        } catch (error) {
            console.log({ error });
        }
    }
}

export default new SeedPaymentStatus();
