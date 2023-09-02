import TFleetVehicleModel from "./FleetVehicle.model";

type TFleetModel = {
    id: number;
    name: string;
    vehicles: TFleetVehicleModel[]
}

export default TFleetModel