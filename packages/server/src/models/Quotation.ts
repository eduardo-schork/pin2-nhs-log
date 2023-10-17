import { Model, DataType, Table, Column, ForeignKey, BelongsTo } from "sequelize-typescript";
import Address from "./Address";
import TQuotationModel from "@/shared/src/models/Quotation.model";

@Table({
    tableName: "Quotation",
    modelName: "Quotation",
})
class Quotation extends Model<TQuotationModel> {
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: "pk_quotation",
    })
    id!: number;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
        field: "qu_cpf",
    })
    cpf!: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
        field: "qu_email",
    })
    email!: string;

    @Column({
        type: DataType.BIGINT,
        allowNull: false,
        field: "currentDate",
    })
    currentDate!: number;

    @ForeignKey(() => Address)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: "fk_origin_address",
    })
    originAddressId!: number;

    @ForeignKey(() => Address)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: "fk_destination_address",
    })
    destinationAddressId!: number;

    @BelongsTo(() => Address, "fk_origin_address")
    OriginAddress!: Address;

    @BelongsTo(() => Address, "fk_destination_address")
    DestinationAddress!: Address;
}

export default Quotation;
