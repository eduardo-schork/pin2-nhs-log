import { Model, DataType, Table, Column, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Quotation from './Quotation';
import FleetVehicle from './FleetVehicle';

@Table({
    tableName: 'Offer',
    modelName: 'Offer',
})
class Offer extends Model<Offer> {
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    })
    pkOffer!: number;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
    })
    ofStatus!: string;

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    ofSubtotal!: number;

    @Column({
        type: DataType.FLOAT,
    })
    ofTaxes?: number;

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    ofTotal!: number;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    ofDeliveryForecast!: Date;

    @ForeignKey(() => Quotation)
    @Column({
        type: DataType.INTEGER,
    })
    fkQuotation!: number;

    @ForeignKey(() => FleetVehicle)
    @Column({
        type: DataType.INTEGER,
    })
    fkFleetVehicle!: number;

    @BelongsTo(() => Quotation)
    quotation?: Quotation;

    @BelongsTo(() => FleetVehicle)
    fleetVehicle?: FleetVehicle;
}

export default Offer;