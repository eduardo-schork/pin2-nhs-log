import { Model, DataType, Table, Column, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Address from './Address';
import DeliveryProcess from './DeliveryProcess';

@Table({
    tableName: 'Delivery_Appointment',
    modelName: 'DeliveryAppointment',
})
class DeliveryAppointment extends Model {
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    })
    pkDeliveryAppointment!: number;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
    })
    daStatus!: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    daAppointmentDate!: Date;

    @ForeignKey(() => Address)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    fkCurrentAddress!: number;

    @ForeignKey(() => DeliveryProcess)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    fkDeliveryProcess!: number;

    @BelongsTo(() => Address, 'fkCurrentAddress')
    CurrentAddress?: Address;

    @BelongsTo(() => DeliveryProcess, 'fkDeliveryProcess')
    DeliveryProcess?: DeliveryProcess;

    @Column({
        type: DataType.DATE,
    })
    createdAt!: Date;

    @Column({
        type: DataType.DATE,
    })
    updatedAt!: Date;
}

export default DeliveryAppointment;