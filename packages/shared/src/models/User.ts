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
    pkUser!: number;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
    })
    userName!: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
    })
    userCpf!: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
    })
    userEmail!: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
    })
    userPassword!: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
    })
    userSession!: string;
}

export default User;