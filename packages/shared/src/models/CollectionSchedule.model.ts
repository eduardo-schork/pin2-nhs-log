import TBaseModel from "./Base.model";

type TCollectionScheduleModel = {
    id: number;
    date: Date;
    comment: string | null;
    collectionAddressId: number;
} & TBaseModel;

export default TCollectionScheduleModel;
