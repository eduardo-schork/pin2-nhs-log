import { Model, DataType, Table, Column, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Quotation from './Quotation';
import FleetVehicle from './FleetVehicle';

@Table({
    tableName: 'Offer',
    modelName: 'Offer',
})
class Offer extends Model {
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    })
    pk_offer!: number;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
    })
    of_status!: string;

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    of_subtotal!: number;

    @Column({
        type: DataType.FLOAT,
    })
    of_taxes?: number;

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    of_total!: number;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    of_delivery_forecast!: Date;

    @ForeignKey(() => Quotation)
    @Column({
        type: DataType.INTEGER,
    })
    fk_quotation!: number;

    @ForeignKey(() => FleetVehicle)
    @Column({
        type: DataType.INTEGER,
    })
    fk_fleet_vehicle!: number;

    @BelongsTo(() => Quotation)
    quotation?: Quotation;

    @BelongsTo(() => FleetVehicle)
    fleet_vehicle?: FleetVehicle;
}

export default Offer;