import { Model, DataType, Table, Column, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Address from './Address';

@Table({
    tableName: 'Collection_Schedule',
    modelName: 'CollectionSchedule',
})
class CollectionSchedule extends Model {
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    })
    pk_collection_schedule!: number;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    cs_schedule_date!: Date;

    @Column({
        type: DataType.STRING(255),
        allowNull: true,
    })
    cs_comment!: string | null;

    @ForeignKey(() => Address)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    fk_collection_address!: number;

    @BelongsTo(() => Address, 'fk_collection_address')
    CollectionAddress?: Address;

    @Column({
        type: DataType.DATE,
    })
    createdAt!: Date;

    @Column({
        type: DataType.DATE,
    })
    updatedAt!: Date;
}

export default CollectionSchedule;