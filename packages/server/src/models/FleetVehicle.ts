import { Model, DataType, Table, Column, ForeignKey, BelongsTo } from "sequelize-typescript";
import Fleet from "./Fleet";
import TFleetVehicleModel from "@/shared/src/models/FleetVehicle.model";

@Table({
    tableName: "Fleet_Vehicle",
    modelName: "FleetVehicle",
})
class FleetVehicle extends Model<TFleetVehicleModel> {
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: "pk_fleet_vehicle",
    })
    id!: number;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
        field: "fv_model",
    })
    model!: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
        field: "fv_plate",
    })
    plate!: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
        field: "fv_cpf_driver",
    })
    cpfDriver!: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
        field: "fv_renavam",
    })
    renavam!: string;

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

export default FleetVehicle;
