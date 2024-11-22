import type { Request, Response } from 'express';

import { createGroup } from '../models/create-group.model';
import { getGroup } from '../models/get-group.model';

class Group {
  async create(request: Request, response: Response) {
    const { name, password } = request.body;

    const group = await getGroup(name);

    if (!!group) throw new Error('Group already exists!');

    const { id } = await createGroup({ name, password });

    response.status(201).json({ id });
  }
}

export const groupController = new Group();
