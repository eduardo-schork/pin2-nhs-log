import { Model, DataType, Table, Column } from 'sequelize-typescript';

@Table({
    tableName: 'Address',
    modelName: 'Address',
})
class Address extends Model<Address> {
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    })
    pk_address!: number;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
    })
    ad_street_address!: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    ad_number!: number;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
    })
    ad_city!: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
    })
    ad_state!: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
    })
    ad_country!: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
    })
    ad_zip_code!: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    ad_geo_latitude!: number | null;

    @Column({
        type: DataType.FLOAT,
        allowNull: true,
    })
    ad_geo_longitude!: number | null;

    @Column({
        type: DataType.DATE,
    })
    createdAt!: Date;

    @Column({
        type: DataType.DATE,
    })
    updatedAt!: Date;
}

export default Address;