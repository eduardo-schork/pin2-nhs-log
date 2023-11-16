import TBaseModel from "./Base.model";
import TFeedbackModel from "./Feedback.model";
import TOfferModel from "./Offer.model";

type TDeliveryProcessModel = {
    id?: number;
    status: string;

    feedbackId?: number;
    feedback?: TFeedbackModel;

    offerId: number;
    offer?: TOfferModel;
} & TBaseModel;

export default TDeliveryProcessModel;
