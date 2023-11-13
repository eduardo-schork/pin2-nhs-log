import TBaseModel from "./Base.model";

type TFleetVehicleFleetModel = {
    id?: number;
    fleetVehicleId: number;
    fleetId: number;
} & TBaseModel;

export default TFleetVehicleFleetModel;
