import TBaseModel from "./Base.model";

type TCollectionScheduleModel = {
    id: number;
    data: number;
    comment: string;
    collectionAddressId: number; 
} & TBaseModel

export default TCollectionScheduleModel