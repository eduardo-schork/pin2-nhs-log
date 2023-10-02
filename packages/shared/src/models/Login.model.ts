import TBaseModel from "./Base.model"

type TLoginModel = {
    email: string;
    password: string;
} & TBaseModel

export default TLoginModel