import { Sequelize } from 'sequelize';
import sequelize from '../config/db';
import User from './userModel';
import Problem from './problemModel';
import Attempt from './attemptModel';
import Solution from './solutionModel';
import TestCase from './testCasesModel';

export { Sequelize, sequelize, User, Problem, Attempt, Solution, TestCase };
