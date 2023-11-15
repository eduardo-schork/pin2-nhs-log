import TBaseModel from "./Base.model";
import TOfferModel from "./Offer.model";

type TDeliveryProcessModel = {
    id?: number;
    status: string;
    offerId: number;
    feedbackId?: number;
    offer?: TOfferModel;
} & TBaseModel;

export default TDeliveryProcessModel;
