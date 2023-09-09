import { Model, DataType, Table, Column, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Address from './Address';

@Table({
    tableName: 'Quotation',
    modelName: 'Quotation',
})
class Quotation extends Model {
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    })
    pk_quotation!: number;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
    })
    qu_cpf!: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
    })
    qu_email!: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    qu_current_date!: Date;

    @ForeignKey(() => Address)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    fk_origin_address!: number;

    @ForeignKey(() => Address)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    fk_destination_address!: number;

    @BelongsTo(() => Address, 'fk_origin_address')
    OriginAddress!: Address;

    @BelongsTo(() => Address, 'fk_destination_address')
    DestinationAddress!: Address;
}

export default Quotation;