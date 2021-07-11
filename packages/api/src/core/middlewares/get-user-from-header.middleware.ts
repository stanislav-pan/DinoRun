import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class GetUserFromHeaderMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}

  public async use(req: Request, res: Response, next: NextFunction) {
    const user = req.headers['x-user'] as string;

    if (!user) {
      res.sendStatus(401);

      return;
    }

    const userFromDB = await this.usersService.findOrCreate(
      JSON.parse(decodeURI(user)),
    );

    req['user'] = userFromDB.get({ plain: true });

    next();
  }
}
