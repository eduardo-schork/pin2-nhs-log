import { Request, Response } from "express";
import LoginRepository from "../../../../repositories/login.repository";
import t from "../../../../infra/i18n";

async function handleFindAdmin(req: Request, res: Response) {
    try {
        const userEmail = req.query.userEmail as string;
        const userPassword = req.query.userPassword as string;

        if (!userEmail || !userPassword) {
            res.status(400).send({ "error": t('common.MissingParameter') });
        }

        const userId = await LoginRepository.authenticateUser(userEmail, userPassword);

        if (userId) {
            res.status(200).send({ "userId": userId });
        } else {
            res.status(400).send({ "error": t('User.notFound') });
        }
    } catch (ex) {
        throw ex;
    }
}

export { handleFindAdmin };
