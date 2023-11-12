import TBaseModel from "./Base.model";

type TCollectionScheduleModel = {
    id?: number; 
    date: any;
    comment: any;
    collectionAddressId: any;
} & TBaseModel;

export default TCollectionScheduleModel;
