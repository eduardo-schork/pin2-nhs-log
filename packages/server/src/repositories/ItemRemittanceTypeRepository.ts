import ItemRemittanceType from "../models/ItemRemittanceType";

class ItemRemittanceTypeRepo {
    async createItemRemittanceType(): Promise<boolean> {
        try {
            await ItemRemittanceType.bulkCreate([
                {
                    pk_item_remittance_type: 1,
                    irt_type: 'Documentos',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    pk_item_remittance_type: 2,
                    irt_type: 'Inflamável',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    pk_item_remittance_type: 3,
                    irt_type: 'Eletrônicos',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    pk_item_remittance_type: 4,
                    irt_type: 'Frágil',
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

export default new ItemRemittanceTypeRepo();