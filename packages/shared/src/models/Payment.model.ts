import TBaseModel from "./Base.model";

type TPaymentModel = {
    id?: number;
    status: string;
    paymentType: string;
    deliveryProcessId: number;
} & TBaseModel;

export default TPaymentModel;
