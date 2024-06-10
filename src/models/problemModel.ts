// problemModel.ts
import {
  Model,
  DataTypes,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
} from 'sequelize';
import { sequelize } from './index'; // Import sequelize instance
import Solution from './solutionModel'; // Import Solution model
import TestCase from './testCasesModel';

interface ProblemAttributes {
  id: number;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  status: 'Draft' | 'Published';
}

class Problem extends Model<ProblemAttributes> implements ProblemAttributes {
  public id!: number;
  public title!: string;
  public description!: string;
  public difficulty!: 'Easy' | 'Medium' | 'Hard';
  public status!: 'Draft' | 'Published';

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Associations
  public getTestCases!: HasManyGetAssociationsMixin<TestCase>;
  public addTestCase!: HasManyAddAssociationMixin<TestCase, number>;
  public hasTestCase!: HasManyHasAssociationMixin<TestCase, number>;
  public countTestCases!: HasManyCountAssociationsMixin;
  public createTestCase!: HasManyCreateAssociationMixin<TestCase>;

  // Define association with Solution
  public getSolutions!: HasManyGetAssociationsMixin<Solution>;
  public addSolution!: HasManyAddAssociationMixin<Solution, number>;
  public hasSolution!: HasManyHasAssociationMixin<Solution, number>;
  public countSolutions!: HasManyCountAssociationsMixin;
  public createSolution!: HasManyCreateAssociationMixin<Solution>;

  // Define association with Attempt
  // public getAttempts!: HasManyGetAssociationsMixin<Attempt>;
  // public addAttempt!: HasManyAddAssociationMixin<Attempt, number>;
  // public hasAttempt!: HasManyHasAssociationMixin<Attempt, number>;
  // public countAttempts!: HasManyCountAssociationsMixin;
  // public createAttempt!: HasManyCreateAssociationMixin<Attempt>;
}

Problem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    difficulty: {
      type: DataTypes.ENUM('Easy', 'Medium', 'Hard'),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('Draft', 'Published'),
      allowNull: false,
      defaultValue: 'Draft',
    },
  },
  {
    sequelize,
    modelName: 'Problem',
    tableName: 'problems',
  },
);

// Define associations after calling init
Problem.hasMany(TestCase, { as: 'testCases', foreignKey: 'problemId' });
Problem.hasMany(Solution, { as: 'solutions', foreignKey: 'problemId' });

export default Problem;
