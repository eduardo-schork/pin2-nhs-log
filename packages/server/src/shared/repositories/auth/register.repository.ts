import IBaseRepository from "../base.repository";
import User from "../../../models/User";
import RegisterModel from "@/shared/src/models/Register.model";
const bcrypt = require("bcrypt");

class RegisterRepository implements IBaseRepository<RegisterModel> {
    async registerAdmin(
        userName: any,
        userCpf: any,
        userEmail: any,
        userPassword: any
    ): Promise<boolean> {
        const hashedPassword = await bcrypt.hash(userPassword, 10);

        const user = await User.create({
            name: userName,
            cpf: userCpf,
            email: userEmail,
            password: hashedPassword,
            createdAt: new Date(),
            createdBy: "",
        });
        return !!user;
    }

    findAll(): Promise<RegisterModel[]> {
        throw new Error("Method not implemented.");
    }
    findOne({ id }: { id: string }): Promise<RegisterModel> {
        throw new Error("Method not implemented.");
    }
    delete({ id }: { id: string }): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    create({ data }: { data: RegisterModel }): Promise<RegisterModel> {
        throw new Error("Method not implemented.");
    }
    update({ data }: { data: RegisterModel }): Promise<RegisterModel> {
        throw new Error("Method not implemented.");
    }
}

export default new RegisterRepository();
