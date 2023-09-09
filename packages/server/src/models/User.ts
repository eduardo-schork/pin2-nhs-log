import { Model, DataType, Table, Column } from 'sequelize-typescript';

@Table({
    tableName: 'User',
    modelName: 'User',
})
class User extends Model {
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    })
    pk_user!: number;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
    })
    user_name!: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
    })
    user_cpf!: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
    })
    user_email!: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
    })
    user_password!: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
    })
    user_session!: string;
}

export default User;