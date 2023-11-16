import IBaseRepository from "./base.repository";
import DeliveryAppointment from "../../models/DeliveryAppointment";
import TDeliveryAppointmentModel from "@/shared/src/models/DeliveryAppointment.model";
import Address from "../../models/Address";

class DeliveryAppointmentRepository implements IBaseRepository<TDeliveryAppointmentModel> {
    async findAll(): Promise<TDeliveryAppointmentModel[]> {
        const findAllResult = await DeliveryAppointment.findAll();
        return findAllResult;
    }

    async findOne({ id }: { id: any }): Promise<TDeliveryAppointmentModel | null> {
        const findOneResult = await DeliveryAppointment.findOne({ where: { id } });
        return findOneResult;
    }

    async findOneDeliveryProcess(id: any): Promise<any | null> {
        const findOneResult = await DeliveryAppointment.findAll({
            where: { deliveryProcessId: id },
            include: [
                {
                    model: Address,
                },
            ],
        });
        return findOneResult;
    }

    async delete({ id }: { id: string }): Promise<boolean> {
        const deletedRows = await DeliveryAppointment.destroy({ where: { id } });

        if (deletedRows > 0) return true;
        return false;
    }

    async create({
        data,
    }: {
        data: TDeliveryAppointmentModel;
    }): Promise<TDeliveryAppointmentModel> {
        const createResult = await DeliveryAppointment.create(data);
        return createResult;
    }

    async update({
        data,
    }: {
        data: TDeliveryAppointmentModel;
    }): Promise<TDeliveryAppointmentModel | null> {
        const [affectedRows] = await DeliveryAppointment.update(data, { where: { id: data.id } });
        if (affectedRows > 0) return data;
        return null;
    }
}

export default new DeliveryAppointmentRepository();
