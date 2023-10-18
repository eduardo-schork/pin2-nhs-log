import { Model, DataType, Table, Column, ForeignKey, BelongsTo } from "sequelize-typescript";
import FleetVehicle from "./FleetVehicle";
import TFleetModel from "@/shared/src/models/Fleet.model";

@Table({
    tableName: "Fleet",
    modelName: "Fleet",
})
class Fleet extends Model<TFleetModel> {
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: "pk_fleet",
    })
    id!: number;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
        field: "fl_name",
    })
    name!: string;

    @ForeignKey(() => FleetVehicle)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: "fk_fleet_vehicle",
    })
    fleetVehicleId!: number;

    @BelongsTo(() => FleetVehicle, "fk_fleet_vehicle")
    fleetVehicle?: FleetVehicle;

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

export default Fleet;
