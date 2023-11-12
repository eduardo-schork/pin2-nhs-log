import TBaseModel from "./Base.model";

type TPaymentTypeModel = {
    id?: number;
    type: string;
} & TBaseModel;

export default TPaymentTypeModel;
