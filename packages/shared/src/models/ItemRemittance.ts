import { Model, DataType, Table, Column, ForeignKey, BelongsTo } from 'sequelize-typescript';
import ItemRemittanceType from './ItemRemittanceType';

@Table({
    tableName: 'Item_Remittance',
    modelName: 'ItemRemittance',
})
class ItemRemittance extends Model {
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    })
    pkItemRemittance!: number;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
    })
    irTypeObject!: string;

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    irWeight!: number;

    @ForeignKey(() => ItemRemittanceType)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    fkItemRemittanceType!: number;

    @BelongsTo(() => ItemRemittanceType)
    ItemRemittanceType!: ItemRemittanceType;

    @Column({
        type: DataType.DATE,
    })
    createdAt!: Date;

    @Column({
        type: DataType.DATE,
    })
    updatedAt!: Date;
}

export default ItemRemittance;