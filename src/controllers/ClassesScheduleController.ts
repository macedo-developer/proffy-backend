import { Request, Response } from 'express';

export default class ClassesScheduleController {
  async show(request: Request, response: Response) {
    const { class_id } = request.params;
  }
}
