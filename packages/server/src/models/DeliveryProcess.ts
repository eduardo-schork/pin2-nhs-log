import { Model, DataType, Table, Column, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Offer from './Offer';
import Feedback from './Feedback';

@Table({
    tableName: 'Delivery_Process',
    modelName: 'DeliveryProcess',
})
class DeliveryProcess extends Model {
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    })
    pk_delivery_process!: number;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
    })
    dp_status!: string;

    @ForeignKey(() => Offer)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    fk_offer!: number;

    @ForeignKey(() => Feedback)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    fk_feedback!: number;

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