import TBaseModel from "./Base.model";

type TFeedbackModel = {
    id: number;
    rating: number;
    comment: string;
} & TBaseModel

export default TFeedbackModel