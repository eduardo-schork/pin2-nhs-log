import TAddressModel from "@/shared/src/models/Address.model";
import TQuotationModel from "@/shared/src/models/Quotation.model";
import TItemRemittanceModel from "@/shared/src/models/ItemRemittance.model";
import deliveryProcessRepository from "../repositories/delivery-process.repository";
import TDeliveryProcessModel from "@/shared/src/models/DeliveryProcess.model";

export type TCreateQuotationWithAddresses = {
    quotation: TQuotationModel;
    destinationAddress: TAddressModel;
    originAddress: TAddressModel;
    itemRemittance: TItemRemittanceModel;
};

async function updateDeliveryProcessStatusUsecase({
    deliveryProcessId,
    status,
}: {
    deliveryProcessId: number;
    status: string;
}) {
    try {
        const returnData = await deliveryProcessRepository.update({
            data: { id: deliveryProcessId, status } as TDeliveryProcessModel,
        });

        return returnData;
    } catch (error) {
        throw error;
    }
}

export default updateDeliveryProcessStatusUsecase;
