import IBaseRepository from "./base.repository";
import User from "../../models/User";
import TUserModel from "@/shared/src/models/User.model";

class UserRepository implements IBaseRepository<TUserModel> {
    async findAll(): Promise<TUserModel[]> {
        const findAllResult = await User.findAll();
        return findAllResult;
    }

    async findOne({ id }: { id: string }): Promise<TUserModel | null> {
        const findOneResult = await User.findOne({ where: { id } });
        return findOneResult;
    }

    async delete({ id }: { id: string }): Promise<boolean> {
        const deletedRows = await User.destroy({ where: { id } });

        if (deletedRows > 0) return true;
        return false;
    }

    async create({ data }: { data: TUserModel }): Promise<TUserModel> {
        const createResult = await User.create(data);
        return createResult;
    }

    async update({ data }: { data: TUserModel }): Promise<TUserModel | null> {
        const [affectedRows] = await User.update(data, { where: { id: data.id } });
        if (affectedRows > 0) return data;
        return null;
    }

    async findUser(id: any): Promise<User | null> {
        try {
            const user = await User.findByPk(id);

            if (user) {
                return user;
            } else {
                return null;
            }
        } catch (error) {
            throw error;
        }
    }
}

export default new UserRepository();
