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
    pk_remittance_type_tax!: number;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
    })
    rrt_type_object!: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
    })
    rrt_calculation_basis!: string;
}

export default RemittanceTypeTax;