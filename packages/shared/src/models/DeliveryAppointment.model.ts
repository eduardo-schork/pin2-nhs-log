import TAddressModel from "./Address.model";
import TBaseModel from "./Base.model";
import TDeliveryProcessModel from "./DeliveryProcess.model";

type TDeliveryAppointmentModel = {
    id?: number;
    date: Date;
    status: string;
    currentAddressId: number;
    currentAddress?: TAddressModel;
    deliveryProcessId: number;
    deliveryProcess?: TDeliveryProcessModel;
} & TBaseModel;

export default TDeliveryAppointmentModel;
