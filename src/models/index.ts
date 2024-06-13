import { Sequelize } from 'sequelize';
import sequelize from '../config/db';
import User from './userModel';
import Problem from './problemModel';
import Attempt from './attemptModel';
import Solution from './solutionModel';
import TestCase from './testCasesModel';
import CodeSnippet from './codeSnippetModel';

Attempt.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Attempt.belongsTo(Problem, { foreignKey: 'problemId', as: 'problem' });
Solution.belongsTo(User, { foreignKey: 'userId', as: 'user' });
CodeSnippet.belongsTo(Problem, { foreignKey: 'problemId', as: 'problem' });

export { Sequelize, sequelize, User, Problem, Attempt, Solution, TestCase };
