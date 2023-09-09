import PaymentStatusRepo from "../repositories/PaymentStatusRepository";

class PaymentStatusServ {
    async initializePaymentStatus() {
        try {
            const paymentStatusRepo = PaymentStatusRepo;
            const result = await paymentStatusRepo.createPaymentStatus();
            // if (!result) {
            //     throw new Error("Error while trying to execute PaymentStatusService")
            // }
            return result;
        } catch (ex) {
            throw new Error(String(ex));
        }
    }
}

export default PaymentStatusServ;