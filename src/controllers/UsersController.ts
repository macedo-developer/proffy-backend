import { Request, Response } from 'express';
import db from '../database/connection';

export default class UsersControllers {
  async create(request: Request, response: Response) {
    const { name, last_name, email, password } = request.body;

    await db('users').insert({ name, last_name, email, password });

    return response.status(201).send();
  }
}
