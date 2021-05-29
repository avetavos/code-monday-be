import { Router, Request, Response } from 'express';
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import CourseService from '../services/course.service'

dayjs.extend(timezone)

class CourseController {
  public path = '/courses';
  public router = Router();

  constructor(private readonly service = new CourseService()) {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(this.path, this.getAllCourses);
    this.router.get(`${this.path}/:id`, this.getCourseById);
    this.router.post(this.path, this.createNewCourse);
    this.router.put(`${this.path}/:id`, this.updateCourseById)
    this.router.delete(`${this.path}/:id`, this.deleteCourseById)
  }

  private getAllCourses = async (req: Request, res: Response) => {
    const courses = await this.service.getAllCourses()
    return res.json({
      courses
    });
  };

  private getCourseById = async (req: Request, res: Response) => {
    const { id } = req.params
    const course = await this.service.findCourseById(id);
    return res.json({
      course
    });
  }

  private createNewCourse = async (req: Request, res: Response) => {
    const {
      title,
      description,
      teacherId
    } = req.body
    const course = await this.service.createCourse({
      title,
      description,
      teacherId
    })
    return res.status(201).json({
      course
    });
  };


  private updateCourseById = async (req: Request, res: Response) => {
    const { id } = req.params
    const {
      title,
      description,
      teacherId
    } = req.body
    const course = await this.service.updateCourseById(id, {
      title,
      description,
      teacherId
    })
    if (!course) {
      return res.status(404).json({
        msg: 'undefined',
      });
    }
    return res.json({
      course
    });
  };


  private deleteCourseById = async (req: Request, res: Response) => {
    const { id } = req.params
    await this.service.deleteCourseById(id)
    return res.json({
      msg: 'deleted'
    });
  };
}

export default CourseController;
