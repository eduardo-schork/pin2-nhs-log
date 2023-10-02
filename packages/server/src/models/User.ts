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
        allowNull: true,
    })
    user_session!: string;

    @Column({
        type: DataType.DATE,
    })
    createdAt!: Date;

    @Column({
        type: DataType.DATE,
    })
    updatedAt!: Date;
}

export default User;