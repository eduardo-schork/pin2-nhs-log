import TBaseModel from "./Base.model";
import TFleetVehicleModel from "./FleetVehicle.model";

type TFleetModel = {
    id?: number;
    name: string;
    vehicles?: TFleetVehicleModel[];
} & TBaseModel;

export default TFleetModel;
