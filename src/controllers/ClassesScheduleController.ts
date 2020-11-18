import { Request, Response } from 'express';
import db from '../database/connection';

export default class ClassesScheduleController {
  async show(request: Request, response: Response) {
    const { class_id } = request.params;

    const schedules = await db('class_schedule')
      .where('class_id', '=', class_id)
      .select('*');

    return response.json(schedules);
  }
}
