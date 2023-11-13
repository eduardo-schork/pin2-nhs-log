import { Model, DataType, Table, Column, ForeignKey, BelongsTo } from "sequelize-typescript";
import TBaseModel from "@/shared/src/models/Base.model";
import FleetVehicle from "./FleetVehicle";
import Fleet from "./Fleet";
import TFleetVehicleFleetModel from "@/shared/src/models/FleetVehicleFleet.model";

@Table({
    tableName: "Fleet_Vehicle_Fleet",
    modelName: "FleetVehicleFleet",
})
class FleetVehicleFleet extends Model<TFleetVehicleFleetModel> {
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: "pk_fleet_vehicle_fleet",
    })
    id!: number;

    @ForeignKey(() => FleetVehicle)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: "fk_fleet_vehicle",
    })
    fleetVehicleId!: number;

    @BelongsTo(() => FleetVehicle, "fk_fleet_vehicle")
    fleetVehicle?: FleetVehicle;

    @ForeignKey(() => Fleet)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: "fk_fleet",
    })
    fleetId!: number;

    @BelongsTo(() => Fleet, "fk_fleet")
    fleet?: Fleet;

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

export default FleetVehicleFleet;
