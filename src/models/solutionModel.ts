import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from './index';
import Problem from './problemModel';
import User from './userModel';

interface SolutionAttributes {
  id: number;
  language: string;
  code: string;
  problemId: number;
  userId: number;
}

interface SolutionCreationAttributes
  extends Optional<SolutionAttributes, 'id'> {}

class Solution
  extends Model<SolutionAttributes, SolutionCreationAttributes>
  implements SolutionAttributes
{
  public id!: number;
  public language!: string;
  public code!: string;
  public problemId!: number;
  public userId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Solution.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    language: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    problemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Problem,
        key: 'id',
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Solution',
    tableName: 'solutions',
    timestamps: true,
  },
);

export default Solution;
