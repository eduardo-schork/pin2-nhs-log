import TBaseModel from "./Base.model"

type TUserModel = {
    name: string;
    cpf: string;
    email: string;
    password: string;
} & TBaseModel

export default TUserModel;