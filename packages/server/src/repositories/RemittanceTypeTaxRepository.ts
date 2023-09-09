import RemittanceTypeTax from "../models/RemittanceTypeTax";

class RemittanceTypeTaxRepo {
    async createRemittanceTypeTax(): Promise<boolean> {
        try {
            await RemittanceTypeTax.bulkCreate([
                {
                    pk_remittance_type_tax: 1,
                    rrt_type_object: 'Documentos',
                    rrt_calculation_basis: 100,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    pk_remittance_type_tax: 2,
                    rrt_type_object: 'Inflamável',
                    rrt_calculation_basis: 450,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    pk_remittance_type_tax: 3,
                    rrt_type_object: 'Eletrônicos',
                    rrt_calculation_basis: 200,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    pk_remittance_type_tax: 4,
                    rrt_type_object: 'Frágil',
                    rrt_calculation_basis: 80,
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

export default new RemittanceTypeTaxRepo();