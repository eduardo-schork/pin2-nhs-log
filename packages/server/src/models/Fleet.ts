import { Model, DataType, Table, Column, ForeignKey, BelongsTo } from 'sequelize-typescript';
import FleetVehicle from './FleetVehicle';

@Table({
    tableName: 'Fleet',
    modelName: 'Fleet',
})
class Fleet extends Model {
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    })
    pk_fleet!: number;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
    })
    fl_name!: string;

    @ForeignKey(() => FleetVehicle)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    fk_fleet_vehicle!: number;

    @BelongsTo(() => FleetVehicle, 'fk_fleet_vehicle')
    fleetVehicle?: FleetVehicle;
}

export default Fleet;