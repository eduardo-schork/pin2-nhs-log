import TBaseModel from "./Base.model";

type TOfferModel = {
    id: number;
    status: string;
    subtotal: number;
    taxes?: number;
    total: number;
    deliveryForecast: Date;
    quotationId: number;
    fleetVehicleId: number;
} & TBaseModel;

export default TOfferModel;
