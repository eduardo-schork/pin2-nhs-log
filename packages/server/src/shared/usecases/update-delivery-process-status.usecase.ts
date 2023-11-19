import TAddressModel from "@/shared/src/models/Address.model";
import TQuotationModel from "@/shared/src/models/Quotation.model";
import TItemRemittanceModel from "@/shared/src/models/ItemRemittance.model";
import deliveryProcessRepository from "../repositories/delivery-process.repository";
import TDeliveryProcessModel from "@/shared/src/models/DeliveryProcess.model";
import { DELIVERY_PROCESS_STATUS } from "@/shared/src/constants/delivery-process-status.const";
import deliveryAppointmentRepository from "../repositories/delivery-appointment.repository";
import {
    DELIVERY_APPOINTMENT_STATUS,
    TDeliveryAppointmentStatus,
} from "@/shared/src/constants/delivery-appointment-status.const";
import addressRepository from "../repositories/address.repository";
import generateRandomAddress from "../../utils/generate-random-address.util";

export type TCreateQuotationWithAddresses = {
    quotation: TQuotationModel;
    destinationAddress: TAddressModel;
    originAddress: TAddressModel;
    itemRemittance: TItemRemittanceModel;
};

async function createDeliveryAppointment(
    status: TDeliveryAppointmentStatus,
    processId: number,
    adminId?: string
) {
    const randomAddress = generateRandomAddress();
    const address = await addressRepository.create({ data: randomAddress });

    if (!address.id) return;

    const response = deliveryAppointmentRepository.create({
        data: {
            date: new Date(),
            status: status,
            currentAddressId: address.id,
            deliveryProcessId: processId,
            createdAt: new Date(),
            createdBy: adminId || "system",
        },
    });

    return response;
}

async function updateDeliveryProcessStatusUsecase({
    deliveryProcessId,
    status,
    adminId,
}: {
    deliveryProcessId: number;
    status: string;
    adminId?: string;
}) {
    try {
        const returnData = await deliveryProcessRepository.update({
            data: { id: deliveryProcessId, status, updatedBy: adminId } as TDeliveryProcessModel,
        });

        if (returnData?.status == DELIVERY_PROCESS_STATUS.COLLECTED) {
            await createDeliveryAppointment(
                DELIVERY_APPOINTMENT_STATUS.COLLECTED,
                deliveryProcessId,
                adminId
            );
        }

        if (returnData?.status == DELIVERY_PROCESS_STATUS.ON_WAY) {
            // mock data
            await createDeliveryAppointment(
                DELIVERY_APPOINTMENT_STATUS.ON_WAY,
                deliveryProcessId,
                adminId
            );
            await createDeliveryAppointment(
                DELIVERY_APPOINTMENT_STATUS.ON_WAY,
                deliveryProcessId,
                adminId
            );
            await createDeliveryAppointment(
                DELIVERY_APPOINTMENT_STATUS.ON_WAY,
                deliveryProcessId,
                adminId
            );
            await createDeliveryAppointment(
                DELIVERY_APPOINTMENT_STATUS.ON_WAY,
                deliveryProcessId,
                adminId
            );
            await createDeliveryAppointment(
                DELIVERY_APPOINTMENT_STATUS.ON_WAY,
                deliveryProcessId,
                adminId
            );
        }

        if (returnData?.status == DELIVERY_PROCESS_STATUS.DELIVERED) {
            await createDeliveryAppointment(
                DELIVERY_APPOINTMENT_STATUS.DELIVERED,
                deliveryProcessId,
                adminId
            );
        }

        if (returnData?.status == DELIVERY_PROCESS_STATUS.DELIVERY_CONFIRMED) {
        }

        return returnData;
    } catch (error) {
        throw error;
    }
}

export default updateDeliveryProcessStatusUsecase;
