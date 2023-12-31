import { Request, Response } from "express";
import t from "../../../../infra/i18n";
import UserRepository from "../../../../shared/repositories/user.repository";

async function getUserById(req: Request, res: Response) {
    try {
        const userId: any = req.query;
        let found = false;

        for (const key in userId) {
            if (userId.hasOwnProperty(key)) {
                const result = await UserRepository.findUser(key);
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

async function findAll(req: Request, res: Response) {
    try {
        const findAllResult = await UserRepository.findAll();
        return res.status(200).send(findAllResult);
    } catch (error) {
        console.log({ error });
        return res.status(500).send(error);
    }
}

async function findOne(req: Request, res: Response) {
    const idToFind = req.query.id;
    try {
        const findOneResult = await UserRepository.findOne({ id: idToFind });
        return res.status(200).send(findOneResult);
    } catch (error) {
        console.log({ error });
        return res.status(500).send(error);
    }
}

async function create(req: Request, res: Response) {
    try {
        const body = req.body;

        const createResult = await UserRepository.create({ data: body });
        return res.status(201).send(createResult);
    } catch (error) {
        console.log({ error });
        return res.status(500).send(error);
    }
}

async function update(req: Request, res: Response) {
    try {
        const body = req.query;
        const updateReturn = await UserRepository.update({ data: body });
        if (updateReturn) {
            return res.status(200).send({ userId: updateReturn.id });
        } else {
            return res.status(400);
        }
    } catch (error) {
        console.log({ error });
        return res.status(500).send(error);
    }
}

async function deleteOne(req: Request, res: Response) {
    try {
        const idToFind = req.query.id;
        const deleteReturn = await UserRepository.delete({ id: idToFind });

        if (deleteReturn) return res.status(200).send("");
        return res.status(400).send("");
    } catch (error) {
        console.log({ error });
        return res.status(500).send(error);
    }
}

const UserController = {
    findAll,
    findOne,
    create,
    update,
    delete: deleteOne,
    getUserById,
};

export default UserController;
