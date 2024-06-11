import {
  Model,
  DataTypes,
  ForeignKey,
  BelongsToGetAssociationMixin,
} from 'sequelize';
import { sequelize } from './index';
import Problem from './problemModel';

interface TestCaseAttributes {
  id: number;
  input: string;
  output: string;
  problemId: number;
}

class TestCase extends Model<TestCaseAttributes> implements TestCaseAttributes {
  public id!: number;
  public input!: string;
  public output!: string;
  public problemId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

TestCase.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    input: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    output: {
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
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  },
  {
    sequelize,
    modelName: 'TestCase',
    tableName: 'testCases',
  },
);

export default TestCase;
