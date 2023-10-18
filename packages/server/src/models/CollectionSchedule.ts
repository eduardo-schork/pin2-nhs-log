import { Model, DataType, Table, Column, ForeignKey, BelongsTo } from "sequelize-typescript";
import Address from "./Address";
import TCollectionScheduleModel from "@/shared/src/models/CollectionSchedule.model";

@Table({
    tableName: "Collection_Schedule",
    modelName: "CollectionSchedule",
})
class CollectionSchedule extends Model<TCollectionScheduleModel> {
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: "pk_collection_schedule",
    })
    id!: number;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        field: "cs_schedule_date",
    })
    date!: Date;

    @Column({
        type: DataType.STRING(255),
        allowNull: true,
        field: "cs_comment",
    })
    comment!: string | null;

    @ForeignKey(() => Address)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: "fk_collection_address",
    })
    collectionAddressId!: number;

    @BelongsTo(() => Address, "fk_collection_address")
    CollectionAddress?: Address;

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

export default CollectionSchedule;
