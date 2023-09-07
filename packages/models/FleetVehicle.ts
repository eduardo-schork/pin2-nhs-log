import { Model, DataType, Table, Column, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Fleet from './Fleet';

@Table({
    tableName: 'Fleet_Vehicle',
    modelName: 'FleetVehicle',
})
class FleetVehicle extends Model<FleetVehicle> {
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    })
    pk_fleet_vehicle!: number;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
    })
    fv_modal!: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
    })
    fv_plate!: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
    })
    fv_cpf_driver!: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
    })
    fv_revam!: string;

    @ForeignKey(() => Fleet)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    fk_fleet!: number;

    @BelongsTo(() => Fleet)
    Fleet!: Fleet;

    @Column({
        type: DataType.DATE,
    })
    createdAt!: Date;

    @Column({
        type: DataType.DATE,
    })
    updatedAt!: Date;
}

export default FleetVehicle;