import TBaseModel from "./Base.model";

type TDeliveryProcessModel = {
    id: number;
    status: string;
    offerId: number;
    feedbackId: number;
} & TBaseModel

export default TDeliveryProcessModel