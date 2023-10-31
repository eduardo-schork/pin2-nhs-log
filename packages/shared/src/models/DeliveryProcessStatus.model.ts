import TBaseModel from "./Base.model";

type TDeliveryProcessStatusModel = {
    id?: number;
    description: string;
} & TBaseModel;

export default TDeliveryProcessStatusModel;
