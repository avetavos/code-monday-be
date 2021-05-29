import { DataTypes, Deferrable } from 'sequelize';
import sequelize from '../database';
import Teacher from './teacher.model';

const Course = sequelize.define(
  'Course',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      autoIncrement: false,
      unique: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    teacherId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    tableName: 'courses',
  }
);

export default Course;
