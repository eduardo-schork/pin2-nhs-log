import TBaseModel from "./Base.model";

type TDeliveryAppointmentModel = {
    id?: number;
    date: Date;
    status: string;
    currentAddressId: number;
    deliveryProcessId: any;
} & TBaseModel;

export default TDeliveryAppointmentModel;
