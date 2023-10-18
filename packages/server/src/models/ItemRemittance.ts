import { Model, DataType, Table, Column, ForeignKey, BelongsTo } from "sequelize-typescript";
import TItemRemittanceModel from "@/shared/src/models/ItemRemittance.model";
import Quotation from "./Quotation";

@Table({
    tableName: "Item_Remittance",
    modelName: "ItemRemittance",
})
class ItemRemittance extends Model<TItemRemittanceModel> {
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: "pk_item_remittance",
    })
    id!: number;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
        field: "ir_type_object",
    })
    objectType!: string;

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
        field: "ir_weight",
    })
    weight!: number;

    @ForeignKey(() => Quotation)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: "fk_quotation",
    })
    quotationId!: number;

    @BelongsTo(() => Quotation, "fk_quotation")
    quotation?: Quotation;

    @Column({
        type: DataType.DATE,
        field: "created_at",
    })
    createdAt!: Date;

    @Column({
        type: DataType.STRING(255),
        field: "created_by",
    })
    createdBy!: string;

    @Column({
        type: DataType.DATE,
        field: "updated_at",
    })
    updatedAt!: Date;

    @Column({
        type: DataType.STRING(255),
        field: "updated_by",
    })
    updatedBy!: string;

    @Column({
        type: DataType.DATE,
        field: "deleted_at",
    })
    deletedAt!: Date;

    @Column({
        type: DataType.STRING(255),
        field: "deleted_by",
    })
    deletedBy!: string;
}

export default ItemRemittance;
