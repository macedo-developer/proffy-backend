import { Request, Response } from 'express';
import db from '../database/connection';

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

    return response.json(user);
  }
}
