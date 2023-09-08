import DeliveryProcessStatusRepo from "../repositories/DeliveryProcessStatusRepository";

class DeliveryProcessStatusServ {
    async initializeDeliveryProcessStatus() {
        try {
            const deliveryProcessStatusRepo = new DeliveryProcessStatusRepo();
            const result = await deliveryProcessStatusRepo.createDeliveryProcessStatus();
            if (!result) {
                throw new Error("Error while trying to execute DeliveryProcessStatusService")
            }
            return result;
        } catch (ex) {
            throw new Error(String(ex));
        }
    }
}

export default DeliveryProcessStatusServ;