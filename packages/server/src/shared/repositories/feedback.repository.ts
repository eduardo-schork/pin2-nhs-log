import TFeedbackModel from "@/shared/src/models/Feedback.model";
import IBaseRepository from "./base.repository";
import Feedback from "../../models/Feedback";

class FeedbackRepository implements IBaseRepository<TFeedbackModel> {
    async findAll(): Promise<TFeedbackModel[]> {
        const findAllResult = await Feedback.findAll();
        return findAllResult;
    }

    async findOne({ id }: { id: string }): Promise<TFeedbackModel | null> {
        const findOneResult = await Feedback.findOne({ where: { id } });
        return findOneResult;
    }

    async delete({ id }: { id: string }): Promise<boolean> {
        const deletedRows = await Feedback.destroy({ where: { id } });

        if (deletedRows > 0) return true;
        return false;
    }
    async create({ data }: { data: TFeedbackModel }): Promise<TFeedbackModel> {
        const createResult = await Feedback.create(data);
        return createResult;
    }

    async update({ data }: { data: TFeedbackModel }): Promise<TFeedbackModel | null> {
        const [affectedRows] = await Feedback.update(data, { where: { id: data.id } });
        if (affectedRows > 0) return data;
        return null;
    }
}

export default new FeedbackRepository();
