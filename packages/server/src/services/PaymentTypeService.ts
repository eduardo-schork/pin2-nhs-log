import PaymentTypeRepo from "../repositories/PaymentTypeRepository";

class PaymentTypeServ {
    async initializePaymentTypes() {
        try {
            const paymentTypeRepo = PaymentTypeRepo;
            const result = await paymentTypeRepo.createPaymentTypes();
            if (!result) {
                throw new Error("Error while trying to execute PaymentTypeService")
            }
            return result;
        } catch (ex) {
            throw new Error(String(ex));
        }
    }
}

export default PaymentTypeServ;