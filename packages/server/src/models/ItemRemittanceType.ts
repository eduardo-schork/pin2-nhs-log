import { Model, DataType, Table, Column } from "sequelize-typescript";

@Table({
    tableName: "Item_Remittance_Type",
    modelName: "ItemRemittanceType",
})
class ItemRemittanceType extends Model {
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    })
    pk_item_remittance_type!: number;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
    })
    irt_type!: string;

    @Column({
        type: DataType.DATE,
    })
    createdAt!: Date;

    @Column({
        type: DataType.DATE,
    })
    updatedAt!: Date;
}

export default ItemRemittanceType;
