import { ModelCtor, Model } from 'sequelize';
import Teacher from '../models/teacher.model';
import {
  TeacherAttributes,
  TeacherCreationAttributes,
} from '../interfaces/teacher.interface';

export default class TeacherService {
  constructor(
    private readonly model: ModelCtor<
      Model<TeacherAttributes, TeacherCreationAttributes>
    > = Teacher
  ) {}

  public getAllTeachers = async () => {
    const teachers = await this.model.findAll();
    return teachers;
  };

  public findTeacherById = async (id: string) => {
    const teacher = await this.model.findOne({
      where: {
        id,
      },
    });
    return teacher;
  };

  public createTeacher = async (params: TeacherCreationAttributes) => {
    const teacher = await this.model.create(params);
    3;
    return teacher;
  };

  public updateTeacherById = async (
    id: string,
    params: TeacherCreationAttributes
  ) => {
    const teacher = await this.model.findOne({
      where: {
        id,
      },
    });
    if (!teacher) return undefined;
    const updatedTeacher = await teacher?.update(params);
    return updatedTeacher;
  };

  public deleteTeacherById = async (id: string) => {
    await this.model.destroy({
      where: {
        id,
      },
    });
  };
}
