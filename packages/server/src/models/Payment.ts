import { Model, DataType, Table, Column, ForeignKey, BelongsTo } from "sequelize-typescript";
import DeliveryProcess from "./DeliveryProcess";
import TPaymentModel from "@/shared/src/models/Payment.model";
import PaymentType from "./PaymentType";
import PaymentStatus from "./PaymentStatus";

@Table({
    tableName: "Payment",
    modelName: "Payment",
})
class Payment extends Model<TPaymentModel> {
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: "pk_payment",
    })
    id!: number;

    @ForeignKey(() => PaymentStatus)
    @Column({
        type: DataType.STRING(255),
        allowNull: false,
        field: "fk_payment_status",
    })
    status!: number;

    @BelongsTo(() => PaymentStatus, "fk_payment_status")
    PaymentStatus?: PaymentStatus;

    @ForeignKey(() => PaymentType)
    @Column({
        type: DataType.STRING(255),
        allowNull: false,
        field: "fk_payment_type",
    })
    paymentType!: string;

    @BelongsTo(() => PaymentType, "fk_payment_type")
    PaymentType?: PaymentType;

    @ForeignKey(() => DeliveryProcess)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: "fk_delivery_process",
    })
    deliveryProcessId!: number;

    @BelongsTo(() => DeliveryProcess, "fk_delivery_process")
    DeliveryProcess?: DeliveryProcess;

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

export default Payment;
