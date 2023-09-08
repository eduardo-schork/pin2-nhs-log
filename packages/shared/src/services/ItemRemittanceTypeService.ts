import ItemRemittanceTypeRepo from "../repositories/ItemRemittanceTypeRepository";

class ItemRemittanceTypeServ {
    async initializeItemRemittanceType() {
        try {
            const itemRemittanceTypeRepo = new ItemRemittanceTypeRepo();
            const result = await itemRemittanceTypeRepo.createItemRemittanceType();
            if (!result) {
                throw new Error("Error while trying to execute ItemRemittanceTypeService")
            }
            return result;
        } catch (ex) {
            throw new Error(String(ex));
        }
    }
}

export default ItemRemittanceTypeServ;