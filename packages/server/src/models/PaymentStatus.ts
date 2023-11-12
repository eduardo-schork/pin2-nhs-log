import { Model, DataType, Table, Column } from "sequelize-typescript";
import TPaymentStatusModel from "@/shared/src/models/PaymentStatus";

@Table({
    tableName: "Payment_Status",
    modelName: "PaymentStatus",
})
class PaymentStatus extends Model<TPaymentStatusModel> {
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
        field: "status",
    })
    status!: string;

    @Column({
        type: DataType.DATE,
        field: "created_at",
    })
    createdAt!: Date;

    @Column({
        type: DataType.DATE,
        field: "updated_at",
    })
    updatedAt!: Date;
}

export default PaymentStatus;
