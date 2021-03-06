import { Request, Response } from 'express';
import db from '../database/connection';
import convertHourToMinute from '../utils/convertHourToMinute';

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

export default class UsersControllers {
  async create(request: Request, response: Response) {
    const { name, last_name, email, password } = request.body;

    await db('users').insert({
      name,
      last_name,
      email,
      password,
      bio: '',
      avatar: '',
      whatsapp: '',
    });

    return response.status(201).send();
  }

  async show(request: Request, response: Response) {
    const filter = request.query;

    const email = filter.email as string;
    const password = filter.password as string;

    const user = await db('users')
      .where('email', email)
      .where('password', password)
      .first();

    if (!user) {
      return response.status(404).json(user);
    }

    return response.json(user);
  }

  async updateUser(request: Request, response: Response) {
    const {
      name,
      last_name,
      email,
      password,
      bio,
      avatar,
      whatsapp,
      subject,
      cost,
      schedule,
    } = request.body;

    const { id } = request.params;

    const trx = await db.transaction();
    try {
      const updateUser = await trx('users')
        .where('id', id)
        .update({ name, last_name, email, password, bio, avatar, whatsapp });

      const insertedClassesIds = await trx('classes').insert({
        subject,
        cost,
        user_id: id,
      });
      const class_id = insertedClassesIds[0];
      const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
        return {
          class_id,
          week_day: scheduleItem.week_day,
          from: convertHourToMinute(scheduleItem.from),
          to: convertHourToMinute(scheduleItem.to),
        };
      });
      await trx('class_schedule').insert(classSchedule);
      await trx.commit();
      return response.status(201).json();
    } catch (err) {
      await trx.rollback();
      return response
        .status(400)
        .json('Unexpected error while updating profile');
    }
  }
  async showUser(request: Request, response: Response) {
    const { id } = request.params;

    const user = await db('users')
      .join('classes', 'classes.user_id', '=', 'users.id')
      .where('users.id', '=', id)
      .select(['classes.*', 'users.*']);

    return response.json(user);
  }
}
