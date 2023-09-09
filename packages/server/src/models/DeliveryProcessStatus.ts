import { Model, DataType, Table, Column } from 'sequelize-typescript';

@Table({
    tableName: 'Delivery_Process_Status',
    modelName: 'DeliveryProcessStatus',
})
class DeliveryProcessStatus extends Model {
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    })
    pk_delivery_process_status!: number;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
    })
    dps_status!: string;

    @Column({
        type: DataType.DATE,
    })
    createdAt!: Date;

    @Column({
        type: DataType.DATE,
    })
    updatedAt!: Date;
}

export default DeliveryProcessStatus;