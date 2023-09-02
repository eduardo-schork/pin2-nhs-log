import TBaseModel from "./Base.model";

type TItemRemittanceModel = {
    id: number;
    objectType: string;
    weight: number;
    quotationId: number;
} & TBaseModel

export default TItemRemittanceModel