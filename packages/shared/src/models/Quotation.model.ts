import TBaseModel from "./Base.model";

type TQuotationModel = {
    id: number;
    cpf: string;
    email: string;
    currentDate: string;
    originAddressId: number;
    destinationAddressId: number;
} & TBaseModel

export default TQuotationModel