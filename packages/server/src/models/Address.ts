import TAddressModel from "@/shared/src/models/Address.model";
import { Model, DataType, Table, Column } from "sequelize-typescript";

@Table({
    tableName: "Address",
    modelName: "Address",
})
class Address extends Model<TAddressModel> {
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: "pk_address",
    })
    id!: number;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
        field: "ad_street_address",
    })
    streetAddress!: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: "ad_number",
    })
    number!: number;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
        field: "ad_city",
    })
    city!: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
        field: "ad_state",
    })
    state!: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
        field: "ad_country",
    })
    country!: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
        field: "ad_zip_code",
    })
    zipCode!: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        field: "ad_geo_latitude",
    })
    geoLatitude!: number | null;

    @Column({
        type: DataType.FLOAT,
        allowNull: true,
        field: "ad_geo_longitude",
    })
    geoLongitude!: number | null;

    @Column({
        type: DataType.DATE,
        field: "createdAt",
    })
    createdAt!: Date;

    @Column({
        type: DataType.DATE,
        field: "updatedAt",
    })
    updatedAt!: Date;
}

export default Address;
