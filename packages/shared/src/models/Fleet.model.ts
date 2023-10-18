import TFleetVehicleModel from "./FleetVehicle.model";

type TFleetModel = {
    id?: number;
    name: string;
    fleetVehicleId: number;
    vehicles?: TFleetVehicleModel[];
};

export default TFleetModel;
