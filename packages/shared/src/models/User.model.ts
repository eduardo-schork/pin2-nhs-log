import TBaseModel from "./Base.model"

type TUserModel = {
    id: number;
    name: string;
    cpf: string;
    email: string;
    password: string;
    session: string;
} & TBaseModel

export default TUserModel