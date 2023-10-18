import TUserModel from "@/shared/src/models/User.model";
import { Model, DataType, Table, Column } from "sequelize-typescript";

@Table({
    tableName: "User",
    modelName: "User",
})
class User extends Model<TUserModel> {
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: "pk_user",
    })
    id!: number;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
        field: "user_name",
    })
    name!: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
        field: "user_cpf",
    })
    cpf!: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
        field: "user_email",
    })
    email!: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
        field: "user_password",
    })
    password!: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: true,
        field: "user_session",
    })
    session!: string;

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

export default User;
