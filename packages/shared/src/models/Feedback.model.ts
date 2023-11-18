import TBaseModel from "./Base.model";

type TFeedbackModel = {
    id?: number;
    rating: number;
    comment: string | null;
} & TBaseModel;

export default TFeedbackModel;
