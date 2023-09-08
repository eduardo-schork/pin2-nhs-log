import OfferStatusRepo from "../repositories/OfferStatusRepository";

class OfferStatusServ {
    async initializeOfferStatus() {
        try {
            const offerStatusRepo = new OfferStatusRepo();
            const result = await offerStatusRepo.createOfferStatus();
            if (!result) {
                throw new Error("Error while trying to execute OfferStatusService")
            }
            return result;
        } catch (ex) {
            throw new Error(String(ex));
        }
    }
}

export default OfferStatusServ;