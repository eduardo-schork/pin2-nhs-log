import TBaseModel from "./Base.model";

type TRemittanceTypeTax = {
    id: number;
    objectType: string;
    calculationBasis: string;
} & TBaseModel

export default TRemittanceTypeTax