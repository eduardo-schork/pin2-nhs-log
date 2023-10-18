import IBaseRepository from "./base.repository";
import TCollectionScheduleModel from "@/shared/src/models/CollectionSchedule.model";
import CollectionSchedule from "../../models/CollectionSchedule";

class CollectionScheduleRepository implements IBaseRepository<TCollectionScheduleModel> {
    async findAll(): Promise<TCollectionScheduleModel[]> {
        const findAllResult = await CollectionSchedule.findAll();
        return findAllResult;
    }

    async findOne({ id }: { id: string }): Promise<TCollectionScheduleModel | null> {
        const findOneResult = await CollectionSchedule.findOne({ where: { id } });
        return findOneResult;
    }

    async delete({ id }: { id: string }): Promise<boolean> {
        const deletedRows = await CollectionSchedule.destroy({ where: { id } });

        if (deletedRows > 0) return true;
        return false;
    }
    async create({ data }: { data: TCollectionScheduleModel }): Promise<TCollectionScheduleModel> {
        const createResult = await CollectionSchedule.create(data);
        return createResult;
    }

    async update({
        data,
    }: {
        data: TCollectionScheduleModel;
    }): Promise<TCollectionScheduleModel | null> {
        const [affectedRows] = await CollectionSchedule.update(data, { where: { id: data.id } });
        if (affectedRows > 0) return data;
        return null;
    }
}

export default new CollectionScheduleRepository();
