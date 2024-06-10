import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from './index';
import User from './userModel';
import Problem from './problemModel';

interface AttemptAttributes {
  id: number;
  code: string;
  language: string;
  status: 'success' | 'fail';
  output: string;
  userId: number;
  problemId: number;
}

interface AttemptCreationAttributes
  extends Optional<AttemptAttributes, 'id' | 'output'> {}

class Attempt
  extends Model<AttemptAttributes, AttemptCreationAttributes>
  implements AttemptAttributes
{
  public id!: number;
  public code!: string;
  public language!: string;
  public status!: 'success' | 'fail';
  public output!: string;
  public userId!: number;
  public problemId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Attempt.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    code: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    language: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('success', 'fail'),
      allowNull: false,
    },
    output: {
      type: DataTypes.TEXT,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    problemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Problem,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Attempt',
    tableName: 'attempts',
  },
);

Attempt.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Attempt.belongsTo(Problem, { foreignKey: 'problemId', as: 'problem' });

export default Attempt;
