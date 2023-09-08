import { Model, DataType, Table, Column } from 'sequelize-typescript';

@Table({
    tableName: 'Remittance_Type_Tax',
    modelName: 'RemittanceTypeTax',
})
class RemittanceTypeTax extends Model {
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    })
    pkRemittanceTypeTax!: number;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
    })
    rrtTypeObject!: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
    })
    rrtCalculationBasis!: string;
}

export default RemittanceTypeTax;