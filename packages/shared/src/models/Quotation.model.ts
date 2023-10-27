import TAddressModel from "./Address.model";
import TBaseModel from "./Base.model";
import TItemRemittanceModel from "./ItemRemittance.model";
import TOfferModel from "./Offer.model";

type TQuotationModel = {
    id?: number;
    cpf: string;
    email: string;
    currentDate: Date;
    originAddressId?: number;
    destinationAddressId?: number;
    originAddress?: TAddressModel;
    destinationAddress?: TAddressModel;
    itemRemittances?: TItemRemittanceModel[];
    offers?: TOfferModel[];
} & TBaseModel;

export default TQuotationModel;
