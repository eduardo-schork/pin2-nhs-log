import LoginModel from "@/shared/src/models/Login.model";
import IBaseRepository from "../base.repository";
import User from "../../../models/User";
const bcrypt = require("bcrypt");

class LoginRepository implements IBaseRepository<LoginModel> {
    async authenticateUser(userEmail: string, userPassword: string): Promise<number | null> {
        const user = await User.findOne({ where: { email: userEmail } });
        if (user) {
            const isPasswordValid = await bcrypt.compare(userPassword, user.password);

            if (isPasswordValid) return user.id;
        }
        return null;
    }

    findAll(): Promise<LoginModel[]> {
        throw new Error("Method not implemented.");
    }
    findOne({ id }: { id: string }): Promise<LoginModel> {
        throw new Error("Method not implemented.");
    }
    delete({ id }: { id: string }): Promise<boolean> {
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
