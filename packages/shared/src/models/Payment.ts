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
    pk_payment!: number;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
    })
    pa_status!: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
    })
    pa_type!: string;

    @ForeignKey(() => DeliveryProcess)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    fk_delivery_process!: number;

    @BelongsTo(() => DeliveryProcess, 'fk_delivery_process')
    DeliveryProcess?: DeliveryProcess;
}

export default Payment;