import { Model, DataType, Table, Column } from 'sequelize-typescript';

@Table({
    tableName: 'MigrationManager',
    modelName: 'MigrationManager',
})
class MigrationManager extends Model {
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    })
    pk_migration_manager!: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    data_version!: number;
}

export default MigrationManager;