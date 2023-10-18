import TRemittanceTypeTax from "@/shared/src/models/RemittanceTypeTax.model";
import { Model, DataType, Table, Column } from "sequelize-typescript";

@Table({
    tableName: "Remittance_Type_Tax",
    modelName: "RemittanceTypeTax",
})
class RemittanceTypeTax extends Model<TRemittanceTypeTax> {
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: "pk_remittance_type_tax",
    })
    id!: number;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
        field: "rrt_type_object",
    })
    objectType!: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
        field: "rrt_calculation_basis",
    })
    calculationBasis!: string;

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

export default RemittanceTypeTax;
