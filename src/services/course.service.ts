import { ModelCtor, Model } from 'sequelize';
import Course from '../models/course.model';
import {
  CourseAttributes,
  CourseCreationAttributes,
} from '../interfaces/course.interface';

export default class CourseService {
  constructor(
    private readonly model: ModelCtor<
      Model<CourseAttributes, CourseCreationAttributes>
    > = Course
  ) {}

  public getAllCourses = async () => {
    const courses = await this.model.findAll();
    return courses;
  };

  public findCourseById = async (id: string) => {
    const course = await this.model.findOne({
      where: {
        id,
      },
    });
    return course;
  };

  public createCourse = async (params: CourseCreationAttributes) => {
    const course = await this.model.create(params);
    3;
    return course;
  };

  public updateCourseById = async (
    id: string,
    params: CourseCreationAttributes
  ) => {
    const course = await this.model.findOne({
      where: {
        id,
      },
    });
    if (!course) return undefined;
    const updatedCourse = await course?.update(params);
    return updatedCourse;
  };

  public deleteCourseById = async (id: string) => {
    await this.model.destroy({
      where: {
        id,
      },
    });
  };
}
