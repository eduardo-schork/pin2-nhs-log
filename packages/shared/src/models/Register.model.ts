import TBaseModel from "./Base.model"

type TRegisterModel = {
    name: string;
    cpf: string;
    email: string;
    password: string;
} & TBaseModel

export default TRegisterModel