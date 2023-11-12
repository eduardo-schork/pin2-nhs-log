import { Model, DataType, Table, Column } from "sequelize-typescript";
import TDeliveryProcessStatusModel from "@/shared/src/models/DeliveryProcessStatus.model";

@Table({
    tableName: "Delivery_Process_Status",
    modelName: "DeliveryProcessStatus",
})
class DeliveryProcessStatus extends Model<TDeliveryProcessStatusModel> {
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: "pk_delivery_process_status",
    })
    id!: number;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
        field: "dps_status",
    })
    description!: string;

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


export default DeliveryProcessStatus;
