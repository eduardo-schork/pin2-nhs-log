import TBaseModel from "./Base.model";

type TDeliveryAppointmentModel = {
    id: number;
    date: number;
    status: string;
    currentAddressId: number;
    deliveryProcessId: number;
} & TBaseModel

export default TDeliveryAppointmentModel