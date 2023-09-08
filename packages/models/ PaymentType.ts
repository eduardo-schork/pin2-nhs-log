import { Model, DataType, Table, Column } from 'sequelize-typescript';

@Table({
    tableName: 'Payment_Type',
    modelName: 'PaymentType',
})
class PaymentType extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        field: "pk_payment_type"
    })
    pk_payment_type!: number;

    @Column({
        type: DataType.STRING(255),
        field: "pt_type"
    })
    pt_type!: string;

    @Column({
        type: DataType.DATE,
        field: "createdAt"
    })
    createdAt!: Date;

    @Column({
        type: DataType.DATE,
        field: "updatedAt"
    })
    updatedAt!: Date;
}

export default PaymentType;
