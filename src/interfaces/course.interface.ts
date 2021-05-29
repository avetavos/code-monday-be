import { Model, Optional, ModelCtor } from 'sequelize';

export interface CourseAttributes {
  id: string;
  title: string;
  description: string;
  teacherId: string;
}

export interface CourseCreationAttributes
  extends Optional<CourseAttributes, 'id'> {}
