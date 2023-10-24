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
        type: DataType.FLOAT,
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
        field: "created_at",
    })
    createdAt!: Date;

    @Column({
        type: DataType.STRING(255),
        field: "created_by",
    })
    createdBy!: string;
    @Column({
        type: DataType.DATE,
        field: "updated_at",
    })
    updatedAt!: Date;

    @Column({
        type: DataType.STRING(255),
        field: "updated_by",
    })
    updatedBy!: string;

    @Column({
        type: DataType.DATE,
        field: "deleted_at",
    })
    deletedAt!: Date;

    @Column({
        type: DataType.STRING(255),
        field: "deleted_by",
    })
    deletedBy!: string;
}

export default Address;
