import IBaseRepository from "./base.repository";
import User from "../../models/User";
import TUserModel from "@/shared/src/models/User.model";
import { z } from "zod";

const TUser = z.object({
    name: z.string().nonempty(),
    cpf: z.string().nonempty(),
    email: z.string().nonempty(),
    password: z.string().nonempty(),
    createdAt: z.date().optional(),
    createdBy: z.string().optional(),
});

class UserRepository implements IBaseRepository<TUserModel> {
    async findAll(): Promise<TUserModel[]> {
        const findAllResult = await User.findAll();
        return findAllResult;
    }

    async findOne({ id }: { id: any }): Promise<TUserModel | null> {
        const findOneResult = await User.findOne({ where: { id } });
        return findOneResult;
    }

    async delete({ id }: { id: any }): Promise<boolean> {
        const deletedRows = await User.destroy({ where: { id } });

        if (deletedRows > 0) return true;
        return false;
    }

    async create({ data }: { data: any }): Promise<TUserModel> {
        await this.validateInput(data);

        const createResult = await User.create(data);
        return createResult;
    }

    async update({ data }: { data: any }): Promise<TUserModel | null> {
        const [affectedRows] = await User.update(data, { where: { id: data.id } });
        if (affectedRows > 0) return data;
        return null;
    }

    async validateInput(data: TUserModel) {
        try {
            await TUser.parseAsync(data);
    
            // CPF validation
            const cleanedCpf = data.cpf.replace(/\D/g, "");
            if (!/^\d{11}$/.test(cleanedCpf)) {
                throw new Error("Erro. CPF inválido!");
            }
        } catch (error: unknown) {
            if (error instanceof z.ZodError) {
                throw new Error("Erro. Os campos obrigatórios devem ser preenchidos corretamente!");
            } else {
                throw error;
            }
        }
    }
    

    async updateUser(userId: any, userName: any, userCpf: any, userEmail: any): Promise<any> {
        try {
            const user = await User.update(
                {
                    name: userName,
                    cpf: userCpf,
                    email: userEmail,
                },
                {
                    where: {
                        id: userId,
                    },
                    returning: true,
                }
            );

            if (user) {
                return user;
            } else {
                return null;
            }
        } catch (error) {
            throw error;
        }
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
