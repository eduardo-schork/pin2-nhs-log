import TBaseModel from "./Base.model";
import TFleetVehicleModel from "./FleetVehicle.model";
import TQuotationModel from "./Quotation.model";

type TOfferModel = {
    id?: number;
    status: string;
    subtotal: number;
    taxes?: number;
    total: number;
    deliveryForecast: Date;

    fleetVehicleId: number;
    fleetVehicle?: TFleetVehicleModel;

    quotationId: number;
    quotation?: TQuotationModel;
} & TBaseModel;

export default TOfferModel;
