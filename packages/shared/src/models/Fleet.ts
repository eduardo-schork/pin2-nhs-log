import { Model, DataType, Table, Column } from 'sequelize-typescript';

@Table({
    tableName: 'Fleet',
    modelName: 'Fleet',
})
class Fleet extends Model {
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    })
    pk_fleet!: number;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
    })
    fl_name!: string;
}

export default Fleet;