import DeliveryAppointmentStatusRepo from "../repositories/DeliveryAppointmentSatusRepository";

class DeliveryAppointmentStatusServ {
    async initializeDeliveryAppointmentStatus() {
        try {
            const deliveryAppointmentStatusRepo = new DeliveryAppointmentStatusRepo();
            const result = await deliveryAppointmentStatusRepo.createDeliveryAppointmentStatus();
            if (!result) {
                throw new Error("Error while trying to execute DeliveryAppointmentStatusService")
            }
            return result;
        } catch (ex) {
            throw new Error(String(ex));
        }
    }
}

export default DeliveryAppointmentStatusServ;