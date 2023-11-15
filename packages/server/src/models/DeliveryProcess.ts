import { Model, DataType, Table, Column, ForeignKey, BelongsTo } from "sequelize-typescript";
import Offer from "./Offer";
import Feedback from "./Feedback";
import TDeliveryProcessModel from "@/shared/src/models/DeliveryProcess.model";

@Table({
    tableName: "Delivery_Process",
    modelName: "DeliveryProcess",
})
class DeliveryProcess extends Model<TDeliveryProcessModel> {
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: "pk_delivery_process",
    })
    id!: number;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
        field: "dp_status",
    })
    status!: string;

    @ForeignKey(() => Offer)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: "fk_offer",
    })
    offerId!: number;

    @ForeignKey(() => Feedback)
    @Column({
        type: DataType.INTEGER,
        field: "fk_feedback",
    })
    feedbackId!: number;

    @BelongsTo(() => Offer, "fk_offer")
    offer?: Offer;

    @BelongsTo(() => Feedback, "fk_feedback")
    feedback?: Feedback;

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

export default DeliveryProcess;
