import { Router, Request, Response } from 'express';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import TeacherService from '../services/teacher.service';

dayjs.extend(timezone);

class TeacherController {
  public path = '/teachers';
  public router = Router();

  constructor(private readonly service = new TeacherService()) {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(this.path, this.getAllTeachers);
    this.router.get(`${this.path}/:id`, this.getTeacherById);
    this.router.post(this.path, this.createNewTeacher);
    this.router.put(`${this.path}/:id`, this.updateTeacherById);
    this.router.delete(`${this.path}/:id`, this.deleteTeacherById);
  }

  private getAllTeachers = async (req: Request, res: Response) => {
    const teachers = await this.service.getAllTeachers();
    return res.json({
      teachers,
    });
  };

  private getTeacherById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const teacher = await this.service.findTeacherById(id);
    return res.json({
      teacher,
    });
  };

  private createNewTeacher = async (req: Request, res: Response) => {
    const { firstName, lastName, dateOfBirth } = req.body;
    const teacher = await this.service.createTeacher({
      firstName,
      lastName,
      dateOfBirth,
    });
    return res.status(201).json({
      teacher,
    });
  };

  private updateTeacherById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { firstName, lastName, dateOfBirth } = req.body;
    const teacher = await this.service.updateTeacherById(id, {
      firstName,
      lastName,
      dateOfBirth,
    });
    if (!teacher) {
      return res.status(404).json({
        msg: 'undefined',
      });
    }
    return res.json({
      teacher,
    });
  };

  private deleteTeacherById = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.service.deleteTeacherById(id);
    return res.json({
      msg: 'deleted',
    });
  };
}

export default TeacherController;
