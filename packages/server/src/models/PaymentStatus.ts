import { Model, DataType, Table, Column } from 'sequelize-typescript';

@Table({
    tableName: 'Payment_Status',
    modelName: 'PaymentStatus',
})
class PaymentStatus extends Model {
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    })
    pk_payment_status!: number;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
    })
    ps_status!: string;
}

export default PaymentStatus;