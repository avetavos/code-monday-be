import { Model, Optional } from 'sequelize';

export interface TeacherAttributes {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
}

export interface TeacherCreationAttributes extends Optional<TeacherAttributes, 'id'> {}
