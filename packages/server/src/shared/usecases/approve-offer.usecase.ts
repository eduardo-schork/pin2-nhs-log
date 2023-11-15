import offerRepository from "../repositories/offer.repository";
import deliveryProcessRepository from "../repositories/delivery-process.repository";
import { DELIVERY_PROCESS_STATUS } from "@/shared/src/constants/delivery-process-status.const";
import Offer from "../../models/Offer";
import deliveryAppointmentRepository from "../repositories/delivery-appointment.repository";
import { OFFER_STATUS } from "@/shared/src/constants/offer-status.const";

async function approveOfferUsecase(offer: Offer) {
    try {
        const updatedOffer = await offerRepository.update({
            data: { ...offer, status: OFFER_STATUS.APPROVED },
        });

        if (!(updatedOffer?.status == OFFER_STATUS.APPROVED)) throw Error("erro");

        const deliveryProcess = await deliveryProcessRepository.create({
            data: {
                offerId: offer.id,
                createdBy: "",
                createdAt: new Date(),
                status: DELIVERY_PROCESS_STATUS.CREATED,
            },
        });

        const deliveryAppointment = await deliveryAppointmentRepository.create({
            data: {
                status: DELIVERY_PROCESS_STATUS.CREATED,
                date: new Date(),
                deliveryProcessId: deliveryProcess.id,
                currentAddressId: 1,
                createdBy: "",
                createdAt: new Date(),
            },
        });

        return {
            offerId: offer.id,
            deliveryProcessId: deliveryProcess.id,
            deliveryAppointmentId: deliveryAppointment.id,
        };
    } catch (error) {
        throw error;
    }
}

export default approveOfferUsecase;
