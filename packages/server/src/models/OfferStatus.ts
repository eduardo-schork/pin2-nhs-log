import { Model, DataType, Table, Column } from 'sequelize-typescript';

@Table({
    tableName: 'Offer_Status',
    modelName: 'OfferStatus',
})
class OfferStatus extends Model {
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    })
    pk_offer_status!: number;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
    })
    os_status!: string;
}

export default OfferStatus;