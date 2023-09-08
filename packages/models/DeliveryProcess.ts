import { Model, DataType, Table, Column, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Offer from './Offer';
import Feedback from './Feedback';

@Table({
    tableName: 'Delivery_Process',
    modelName: 'DeliveryProcess',
})
class DeliveryProcess extends Model<DeliveryProcess> {
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    })
    pkDeliveryProcess!: number;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
    })
    dpStatus!: string;

    @ForeignKey(() => Offer)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    fkOffer!: number;

    @ForeignKey(() => Feedback)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    fkFeedback!: number;

    @BelongsTo(() => Offer, 'fkOffer')
    Offer?: Offer;

    @BelongsTo(() => Feedback, 'fkFeedback')
    Feedback?: Feedback;

    @Column({
        type: DataType.DATE,
    })
    createdAt!: Date;

    @Column({
        type: DataType.DATE,
    })
    updatedAt!: Date;
}

export default DeliveryProcess;