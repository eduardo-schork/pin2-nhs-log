import { Model, DataType, Table, Column } from 'sequelize-typescript';

@Table({
    tableName: 'Feedback',
    modelName: 'Feedback',
})
class Feedback extends Model {
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    })
    pk_feedback!: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    fe_rating!: number;

    @Column({
        type: DataType.STRING(255),
        allowNull: true,
    })
    fe_comment!: string | null;

    @Column({
        type: DataType.DATE,
    })
    createdAt!: Date;

    @Column({
        type: DataType.DATE,
    })
    updatedAt!: Date;
}

export default Feedback;