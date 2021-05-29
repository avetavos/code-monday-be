import { DataTypes } from 'sequelize';
import sequelize from '../database';

const Teacher = sequelize.define(
  'Teacher',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      autoIncrement: false,
      unique: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateOfBirth: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'teachers'
  }
);

export default Teacher;
