import RemittanceTypeTaxRepo from "../repositories/RemittanceTypeTaxRepository";

class RemittanceTypeTaxServ {
    async initializeRemittanceTypeTax() {
        try {
            const remittanceTypeTaxRepo = RemittanceTypeTaxRepo;
            const result = await remittanceTypeTaxRepo.createRemittanceTypeTax();
            if (!result) {
                throw new Error("Error while trying to execute RemittanceTypeTaxService")
            }
            return result;
        } catch (ex) {
            throw new Error(String(ex));
        }
    }
}

export default RemittanceTypeTaxServ;