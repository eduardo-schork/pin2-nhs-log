import offerRepository from "../repositories/offer.repository";
import deliveryProcessRepository from "../repositories/delivery-process.repository";
import { DELIVERY_PROCESS_STATUS } from "@/shared/src/constants/delivery-process-status.const";
import Offer from "../../models/Offer";
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

        return {
            offerId: offer.id,
            deliveryProcessId: deliveryProcess.id,
        };
    } catch (error) {
        throw error;
    }
}

export default approveOfferUsecase;
