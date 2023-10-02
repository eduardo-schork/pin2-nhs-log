import { Request, Response } from "express";
import LoginRepository from "../../../../repositories/login.repository";
import t from "../../../../infra/i18n";

async function handleFindAdmin(req: Request, res: Response) {
    try {
        const userEmail = req.query.userEmail as string;
        const userPassword = req.query.userPassword as string;

        if (!userEmail || !userPassword) {
            res.status(400).send({ "error ": t('common.MissingParameter') });
        }

        const checkEmail = await LoginRepository.checkEmail(userEmail);
        const checkPassword = await LoginRepository.checkPassword(userEmail, userPassword);

        if (checkEmail && checkPassword) {
            res.status(200).send(true);
        } else if (!checkEmail) {
            res.status(400).send({ "error ": t('User.notFound') });
        } else {
            res.status(400).send({ "error ": t('User.wrongPassword') });
        }
    } catch (ex) {
        throw (ex);
    }
}

export { handleFindAdmin };
