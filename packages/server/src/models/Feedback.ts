import TFeedbackModel from "@/shared/src/models/Feedback.model";
import { Model, DataType, Table, Column } from "sequelize-typescript";

@Table({
    tableName: "Feedback",
    modelName: "Feedback",
})
class Feedback extends Model<TFeedbackModel> {
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: "pk_feedback",
    })
    id!: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: "fe_rating",
    })
    rating!: number;

    @Column({
        type: DataType.STRING(255),
        allowNull: true,
        field: "fe_comment",
    })
    comment!: string | null;

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

export default Feedback;
