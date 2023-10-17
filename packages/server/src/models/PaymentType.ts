import { Model, DataType, Table, Column } from "sequelize-typescript";

@Table({
    tableName: "Payment_Type",
    modelName: "PaymentType",
})
class PaymentType extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
    })
    pk_payment_type!: number;

    @Column({
        type: DataType.STRING(255),
    })
    pt_type!: string;

    @Column({
        type: DataType.DATE,
    })
    createdAt!: Date;

    @Column({
        type: DataType.DATE,
    })
    updatedAt!: Date;
}

export default PaymentType;
