import IBaseRepository from "./base.repository";
import Payment from "../../models/Payment";
import TPaymentModel from "@/shared/src/models/Payment.model";

class PaymentRepository implements IBaseRepository<TPaymentModel> {
    async findAll(): Promise<TPaymentModel[]> {
        const findAllResult = await Payment.findAll();
        return findAllResult;
    }

    async findOne({ id }: { id: string }): Promise<TPaymentModel | null> {
        const findOneResult = await Payment.findOne({ where: { id } });
        return findOneResult;
    }

    async delete({ id }: { id: string }): Promise<boolean> {
        const deletedRows = await Payment.destroy({ where: { id } });

        if (deletedRows > 0) return true;
        return false;
    }

    async create({ data }: { data: TPaymentModel }): Promise<TPaymentModel> {
        const createResult = await Payment.create(data);
        return createResult;
    }

    async update({ data }: { data: TPaymentModel }): Promise<TPaymentModel | null> {
        const [affectedRows] = await Payment.update(data, { where: { id: data.id } });
        if (affectedRows > 0) return data;
        return null;
    }
}

export default new PaymentRepository();
