import { Request, Response } from "express";
import PaymentRepository from "../../../../shared/repositories/payment.repository";
import { sendEmailAfterProcessPayment } from "../../../../shared/service/email-service";
import { PAYMENT_STATUS } from "@/shared/src/constants/payment-status.const";
import { DELIVERY_PROCESS_STATUS } from "@/shared/src/constants/delivery-process-status.const";
import deliveryProcessRepository from "../../../../shared/repositories/delivery-process.repository";
import TDeliveryProcessModel from "@/shared/src/models/DeliveryProcess.model";

async function findAll(req: Request, res: Response) {
    try {
        const findAllResult = await PaymentRepository.findAll();
        return res.status(200).send(findAllResult);
    } catch (error) {
        console.log({ error });
        return res.status(500).send(error);
    }
}

async function findOne(req: Request, res: Response) {
    const idToFind = req.params.id;
    try {
        const findOneResult = await PaymentRepository.findOne({ id: idToFind });
        return res.status(200).send(findOneResult);
    } catch (error) {
        console.log({ error });
        return res.status(500).send(error);
    }
}

async function create(req: Request, res: Response) {
    try {
        const body = req.body;
        const createResult = await PaymentRepository.create({ data: body });
        if (createResult) {
            //TODO fazer com que de alguma forma, na requisição pegue o email que o usuário deseja receber o código de rastreio
            const userEmail = "?";
            const emailSent = await sendEmailAfterProcessPayment(userEmail, body.deliveryProcessId);
            if (emailSent) {
                return res.status(200).send(createResult);
            }
        }
        return res.status(400);
    } catch (error) {
        console.log({ error });
        return res.status(500).send(error);
    }
}

async function createPayment(req: Request, res: Response) {
    try {
        const body = req.body;
        const payment = await PaymentRepository.create({
            data: {
                // TODO change this hard coded value
                status: PAYMENT_STATUS.APPROVED,
                paymentType: body.paymentType,
                deliveryProcessId: body.deliveryProcessId,
                createdAt: new Date(),
                createdBy: "",
            },
        });

        await deliveryProcessRepository.update({
            data: {
                id: body?.deliveryProcessId,
                status: DELIVERY_PROCESS_STATUS.INVOICED,
            } as TDeliveryProcessModel,
        });

        const userEmail = body?.quotationEmail;
        await sendEmailAfterProcessPayment(userEmail, body.deliveryProcessId);

        return res.status(201).json(payment);
    } catch (error) {
        console.error("Error creating delivery process:", error);
        return res.status(500).json({ error: "Failed to create delivery process" });
    }
}

async function update(req: Request, res: Response) {
    try {
        const body = req.body;

        const updateReturn = await PaymentRepository.update({ data: body });
        return res.status(204).send(updateReturn);
    } catch (error) {
        console.log({ error });
        return res.status(500).send(error);
    }
}

async function deleteOne(req: Request, res: Response) {
    try {
        const idToFind = req.params.id;

        const deleteReturn = await PaymentRepository.delete({ id: idToFind });

        if (deleteReturn) return res.status(204).send("");
        return res.status(400).send("");
    } catch (error) {
        console.log({ error });
        return res.status(500).send(error);
    }
}

const PaymentController = {
    findAll,
    findOne,
    create,
    update,
    createPayment,
    delete: deleteOne,
};

export default PaymentController;
