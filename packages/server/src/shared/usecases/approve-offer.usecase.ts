import TAddressModel from "@/shared/src/models/Address.model";
import TQuotationModel from "@/shared/src/models/Quotation.model";
import Address from "../../models/Address";
import Quotation from "../../models/Quotation";
import TItemRemittanceModel from "@/shared/src/models/ItemRemittance.model";
import ItemRemittance from "../../models/ItemRemittance";
import offerRepository from "../repositories/offer.repository";
import { OfferStatus } from "@/shared/src/constants/offer-status.const";
import DeliveryProcess from "../../models/DeliveryProcess";
import deliveryProcessRepository from "../repositories/delivery-process.repository";
import { DELIVERY_PROCESS_STATUS } from "@/shared/src/constants/delivery-process-status.const";
import Offer from "../../models/Offer";
import deliveryAppointmentRepository from "../repositories/delivery-appointment.repository";

async function approveOfferUsecase(offer : Offer) {
    try {
        console.log({offer})
        const updatedOffer = await offerRepository.update({
            data: {...offer , status : OfferStatus.APPROVED}
        });
        
        if(!(updatedOffer?.status == OfferStatus.APPROVED)) throw Error("erro")
        
        const deliveryProcess = await deliveryProcessRepository.create({data : {
            status : DELIVERY_PROCESS_STATUS.CREATED, 
            offerId : offer.id, 
            createdBy : "", 
            createdAt : new Date()
        }})

        const deliveryAppointment = await deliveryAppointmentRepository.create({
            data: {
                status : DELIVERY_PROCESS_STATUS.CREATED, 
                date : new Date(),
                deliveryProcessId : deliveryProcess.id,
                currentAddressId : 1,
                createdBy : "", 
                createdAt : new Date()
            }
        })

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
