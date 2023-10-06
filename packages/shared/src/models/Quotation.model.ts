import TBaseModel from "./Base.model";
import TItemRemittanceModel from "./ItemRemittance.model";

type TQuotationModel = {
    id: number;
    cpf: string;
    email: string;
    currentDate: string;
    originAddressId: number;
    destinationAddressId: number;
    itemRemittance?: TItemRemittanceModel;
} & TBaseModel;

export default TQuotationModel;
