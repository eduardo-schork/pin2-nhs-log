import LoginModel from "@/shared/src/models/Login.model";
import IBaseRepository from "../base.repository";
import User from "../../../models/User";
const bcrypt = require("bcrypt");
import { z } from "zod";

const TLogin = z.object({
    email: z.string().nonempty(),
    password: z.string().nonempty(),
});

class LoginRepository implements IBaseRepository<LoginModel> {
    
    async authenticateUser(userEmail: string, userPassword: string): Promise<number | null> {
        await this.validateInput({ email: userEmail, password: userPassword });
        
        const user = await User.findOne({ where: { email: userEmail } });

        if (user) {
            const isPasswordValid = await bcrypt.compare(userPassword, user.password);
            if (isPasswordValid) {
                return user.id;
            } else {
                throw new Error("Erro. Usuário não encontrado!");
            }
        } else {
            throw new Error("Erro. Usuário não encontrado!");
        }
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

    async validateInput(data: any) {
        try {
            await TLogin.parseAsync(data);
        } catch (error) {
            throw new Error("Erro. Os campos obrigatórios devem ser preenchidos corretamente!");
        }
    }    
}

export default new LoginRepository();
