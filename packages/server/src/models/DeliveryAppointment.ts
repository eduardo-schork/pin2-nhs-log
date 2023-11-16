import { Model, DataType, Table, Column, ForeignKey, BelongsTo } from "sequelize-typescript";
import Address from "./Address";
import DeliveryProcess from "./DeliveryProcess";
import TDeliveryAppointmentModel from "@/shared/src/models/DeliveryAppointment.model";

@Table({
    tableName: "Delivery_Appointment",
    modelName: "DeliveryAppointment",
})
class DeliveryAppointment extends Model<TDeliveryAppointmentModel> {
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: "pk_delivery_appointment",
    })
    id!: number;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
        field: "da_status",
    })
    status!: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        field: "da_appointment_date",
    })
    date!: Date;

    @ForeignKey(() => Address)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: "fk_current_address",
    })
    currentAddressId!: number;

    @ForeignKey(() => DeliveryProcess)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: "fk_delivery_process",
    })
    deliveryProcessId!: number;

    @BelongsTo(() => Address, "fk_current_address")
    currentAddress?: Address;

    @BelongsTo(() => DeliveryProcess, "fk_delivery_process")
    deliveryProcess?: DeliveryProcess;

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

export default DeliveryAppointment;
