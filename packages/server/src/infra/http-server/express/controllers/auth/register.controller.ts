import { Request, Response } from "express";
import RegisterRepository from "../../../../../shared/repositories/auth/register.repository";
import t from "../../../../i18n";

async function handleRegisterAdmin(req: Request, res: Response) {
    try {
        const userEmail = req.query.userEmail;
        const userName = req.query.userName;
        const userCpf = req.query.userCpf;
        const userPassword = req.query.userPassword;

        const result = await RegisterRepository.registerAdmin(
            userName,
            userCpf,
            userEmail,
            userPassword
        );
        if (result) {
            res.status(200).send(result);
        } else {
            res.status(400).send({ "error ": t("User.notRegistered") });
        }
    } catch (ex) {
        throw ex;
    }
}

export { handleRegisterAdmin };
