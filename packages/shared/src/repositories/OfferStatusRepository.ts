import OfferStatus from "../models/OfferStatus";

class OfferStatusRepo {
    async createOfferStatus(): Promise<boolean> {
        try {
            await OfferStatus.bulkCreate([
                {
                    pk_offer_status: 1,
                    os_status: 'Em aberto',
                },
                {
                    pk_offer_status: 2,
                    os_status: 'Em negociação',
                },
                {
                    pk_offer_status: 3,
                    os_status: 'Cancelado',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    pk_offer_status: 4,
                    os_status: 'Aprovado',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    pk_offer_status: 5,
                    os_status: 'Reprovado',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }
            ]);
            return true;
        } catch (error) {
            return false;
        }
    }
}

export default OfferStatusRepo;