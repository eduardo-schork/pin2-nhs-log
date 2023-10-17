import TAddressModel from "@/shared/src/models/Address.model";
import TQuotationModel from "@/shared/src/models/Quotation.model";
import Address from "../../models/Address";
import Quotation from "../../models/Quotation";

async function createQuotationWithAddressesUsecase({
    quotation,
    destinationAddress,
    originAddress,
}: {
    quotation: TQuotationModel;
    destinationAddress: TAddressModel;
    originAddress: TAddressModel;
}) {
    const databaseOriginAddress = await Address.create(originAddress);
    console.log({ databaseOriginAddress });

    const databaseDestinationAddress = await Address.create(destinationAddress);
    console.log({ databaseDestinationAddress });

    const databaseQuotation = await Quotation.create({
        ...quotation,
        originAddressId: databaseOriginAddress.pk_address,
        destinationAddressId: databaseDestinationAddress.pk_address,
    });
}

export default createQuotationWithAddressesUsecase;
