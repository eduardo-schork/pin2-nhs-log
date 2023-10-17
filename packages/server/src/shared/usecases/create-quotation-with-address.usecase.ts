import TAddressModel from "@/shared/src/models/Address.model";
import TQuotationModel from "@/shared/src/models/Quotation.model";
import Address from "../../models/Address";
import Quotation from "../../models/Quotation";
import TItemRemittanceModel from "@/shared/src/models/ItemRemittance.model";
import ItemRemittance from "../../models/ItemRemittance";

export type TCreateQuotationWithAddresses = {
    quotation: TQuotationModel;
    destinationAddress: TAddressModel;
    originAddress: TAddressModel;
    itemRemittance: TItemRemittanceModel;
};

async function createQuotationWithAddressesUsecase({
    quotation,
    destinationAddress,
    originAddress,
    itemRemittance,
}: TCreateQuotationWithAddresses) {
    try {
        const databaseOriginAddress = await Address.create(originAddress);

        const databaseDestinationAddress = await Address.create(destinationAddress);

        const databaseQuotation = await Quotation.create({
            ...quotation,
            originAddressId: databaseOriginAddress.id,
            destinationAddressId: databaseDestinationAddress.id,
        });

        await ItemRemittance.create({
            ...itemRemittance,
            quotationId: databaseQuotation.id,
        });

        return databaseQuotation;
    } catch (error) {
        throw error;
    }
}

export default createQuotationWithAddressesUsecase;
