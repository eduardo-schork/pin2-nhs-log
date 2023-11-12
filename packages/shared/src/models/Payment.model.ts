import TBaseModel from "./Base.model";

type TPaymentModel = {
    id?: number;
    status: number;
    paymentType: string;
    deliveryProcessId: number;
} & TBaseModel

export default TPaymentModel