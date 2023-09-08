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
    pkFeedback!: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    feRating!: number;

    @Column({
        type: DataType.STRING(255),
        allowNull: true,
    })
    feComment!: string | null;

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