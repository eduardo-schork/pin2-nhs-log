import { Model, DataType, Table, Column } from "sequelize-typescript";
import TPaymentTypeModel from "@/shared/src/models/PaymentType";

@Table({
    tableName: "Payment_Type",
    modelName: "PaymentType",
})

class PaymentType extends Model<TPaymentTypeModel> {
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: "id",
    })
    id!: number;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
        field: "type",
    })
    type!: string;
}

export default PaymentType;
