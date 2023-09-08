import { Model, DataType, Table, Column } from 'sequelize-typescript';

@Table({
    tableName: 'Delivery_Appointment_Status',
    modelName: 'DeliveryAppointmentStatus',
})
class DeliveryAppointmentStatus extends Model<DeliveryAppointmentStatus> {
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    })
    pk_delivery_appointment_status!: number;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
    })
    das_status!: string;

    @Column({
        type: DataType.DATE,
    })
    createdAt!: Date;

    @Column({
        type: DataType.DATE,
    })
    updatedAt!: Date;
}

export default DeliveryAppointmentStatus;