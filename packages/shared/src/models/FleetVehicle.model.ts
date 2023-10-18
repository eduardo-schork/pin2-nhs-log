import TBaseModel from "./Base.model";

type TFleetVehicleModel = {
    id?: number;
    model: string;
    plate: string;
    cpfDriver: string;
    renavam: string;
} & TBaseModel;

export default TFleetVehicleModel;
