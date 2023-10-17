import { Request, Response } from "express";
import t from "../../../../infra/i18n";
import userRepository from "../../../../shared/repositories/user.repository";

async function getUserById(req: Request, res: Response) {
    try {
        const userId: any = req.query;
        console.log(req.query);
        let found = false;

        for (const key in userId) {
            if (userId.hasOwnProperty(key)) {
                const result = await userRepository.findUser(key);
                if (result) {
                    res.status(200).send(result);
                    found = true;
                    break;
                }
            }
        }
        if (!found) {
            res.status(400).send({ error: t("User.notFound") });
        }
    } catch (ex) {
        throw ex;
    }
}

export { getUserById };
