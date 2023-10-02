import TBaseModel from "./Base.model";
import TItemRemittanceModel from "./ItemRemittance.model";

type TQuotationModel = {
    id: number;
    cpf: string;
    email: string;
    currentDate: string;
    originAddressId: number;
    destinationAddressId: number;
    remittanceTypeId: number;
    remittanceType?: TItemRemittanceModel;
} & TBaseModel;

export default TQuotationModel;
