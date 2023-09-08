import { Model, DataType, Table, Column, ForeignKey, BelongsTo } from 'sequelize-typescript';
import DeliveryProcess from './DeliveryProcess';

@Table({
    tableName: 'Payment',
    modelName: 'Payment',
})
class Payment extends Model {
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    })
    pkPayment!: number;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
    })
    paStatus!: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
    })
    paType!: string;

    @ForeignKey(() => DeliveryProcess)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    fkDeliveryProcess!: number;

    @BelongsTo(() => DeliveryProcess, 'fkDeliveryProcess')
    DeliveryProcess?: DeliveryProcess;
}

export default Payment;