import LoginModel from "@/shared/src/models/Login.model";
import IBaseRepository from "./base.repository";
import User from "../models/User";
const bcrypt = require('bcrypt');

class LoginRepository implements IBaseRepository<LoginModel> {
    async checkEmail(userEmail: any): Promise<boolean> {
        const user = await User.findOne({
            where: { user_email: userEmail }
        });
        return !!user;
    }

    async checkPassword(userEmail: any, userPassword: any): Promise<boolean> {
        const user = await User.findOne({ where: { user_email: userEmail } });
        if (user) {
            const isPasswordValid = await bcrypt.compare(userPassword, user.user_password);
            return isPasswordValid;
        }
        return false;
    }


    async findAdminByEmailAndPassword(userEmail: string, userPassword: string): Promise<boolean> {
        const user = await User.findOne({
            where: { user_email: userEmail }
        });

        if (user) {
            const hashedPassword = await bcrypt.hash(userPassword, 10);
            const isPasswordValid = await bcrypt.compare(hashedPassword, user.user_password);
            console.log(hashedPassword, user.user_password)
            return isPasswordValid;
        }

        return false;
    }


    findAll(): Promise<LoginModel[]> {
        throw new Error("Method not implemented.");
    }
    findOne({ id }: { id: string }): Promise<LoginModel> {
        throw new Error("Method not implemented.");
    }
    delete({ id }: { id: string }): Promise<void> {
        throw new Error("Method not implemented.");
    }
    create({ data }: { data: LoginModel }): Promise<LoginModel> {
        throw new Error("Method not implemented.");
    }
    update({ data }: { data: LoginModel }): Promise<LoginModel> {
        throw new Error("Method not implemented.");
    }
}

export default new LoginRepository();
