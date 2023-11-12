import TBaseModel from "./Base.model";

type TPaymentStatusModel = {
    id?: number;
    status: string;
} & TBaseModel;

export default TPaymentStatusModel;
