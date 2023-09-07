import { Model, DataType, Table, Column } from 'sequelize-typescript';

@Table({
    tableName: 'Offer_Status',
    modelName: 'OfferStatus',
})
class OfferStatus extends Model<OfferStatus> {
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    })
    pkOfferStatus!: number;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
    })
    osStatus!: string;
}

export default OfferStatus;