// src/models/codeSnippetModel.ts
import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/db';
import Problem from './problemModel';

export interface CodeSnippetAttributes {
  id: number;
  problemId: number;
  language: string;
  starterCode: string;
  codeExample: string;
}

export interface CodeSnippetCreationAttributes
  extends Optional<CodeSnippetAttributes, 'id'> {}

class CodeSnippet
  extends Model<CodeSnippetAttributes, CodeSnippetCreationAttributes>
  implements CodeSnippetAttributes
{
  public id!: number;
  public problemId!: number;
  public language!: string;
  public starterCode!: string;
  public codeExample!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

CodeSnippet.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    problemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Problem,
        key: 'id',
      },
    },
    language: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    starterCode: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    codeExample: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'CodeSnippet',
    tableName: 'codeSnippets',
  },
);

export default CodeSnippet;
