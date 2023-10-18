import ItemRemittanceType from "../../../../models/ItemRemittanceType";

class SeedItemRemittanceType {
    async execute(): Promise<boolean> {
        try {
            await ItemRemittanceType.bulkCreate([
                {
                    id: 1,
                    type: "Documentos",
                    createdAt: Date.now(),
                    createdBy: "",
                },
                {
                    id: 2,
                    type: "Inflamável",
                    createdAt: Date.now(),
                    createdBy: "",
                },
                {
                    id: 3,
                    type: "Eletrônicos",
                    createdAt: Date.now(),
                    createdBy: "",
                },
                {
                    id: 4,
                    type: "Frágil",
                    createdAt: Date.now(),
                    createdBy: "",
                },
            ]);
            return true;
        } catch (error) {
            return false;
        }
    }
}

export default new SeedItemRemittanceType();
