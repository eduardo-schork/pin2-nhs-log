import IBaseRepository from "./base.repository";
import User from "../models/User";
import TUserModel from "@/shared/src/models/User.model";
const bcrypt = require('bcrypt');

class UserRepository implements IBaseRepository<TUserModel> {
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

    findAll(): Promise<TUserModel[]> {
        throw new Error("Method not implemented.");
    }
    findOne({ id }: { id: string }): Promise<TUserModel> {
        throw new Error("Method not implemented.");
    }
    delete({ id }: { id: string }): Promise<void> {
        throw new Error("Method not implemented.");
    }
    create({ data }: { data: TUserModel }): Promise<TUserModel> {
        throw new Error("Method not implemented.");
    }
    update({ data }: { data: TUserModel }): Promise<TUserModel> {
        throw new Error("Method not implemented.");
    }
}

export default new UserRepository();
