import TDeliveryProcessModel from "@/shared/src/models/DeliveryProcess.model";
import deliveryProcessRepository from "../repositories/delivery-process.repository";
import feedbackRepository from "../repositories/feedback.repository";

async function createFeedbackUsecase(
    deliveryProcessId: number,
    feedback: { comment: string; rating: number }
) {
    const newFeedback = await feedbackRepository.create({
        data: { ...feedback, createdAt: new Date(), createdBy: "system" },
    });

    const updatedDeliveryProcess = await deliveryProcessRepository.update({
        data: {
            id: deliveryProcessId,
            feedbackId: newFeedback.id,
        } as TDeliveryProcessModel,
    });

    console.log({ newFeedback });
    console.log({ updatedDeliveryProcess });
}

export default createFeedbackUsecase;
