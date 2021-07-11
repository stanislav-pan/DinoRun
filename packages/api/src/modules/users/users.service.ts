import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { YandexUser } from 'src/core/types/yandex-user';
import { ThemesService } from '../themes/themes.service';
import { User } from './models/user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private themesService: ThemesService,
  ) {}

  public async findOrCreate(yandexUser: YandexUser) {
    const { id: userId, ...userData } = yandexUser;

    const [user, isNew] = await this.userModel.findOrCreate({
      where: {
        externalUserId: userId,
      },
      defaults: {
        externalUserId: userId,
        ...userData,
      },
    });

    if (isNew) {
      await this.themesService.selectDefaultTheme(user.id);

      return user;
    }

    const [_, updatedUsers] = await this.userModel.update(userData, {
      where: {
        id: user.id,
      },
      returning: true,
    });

    return updatedUsers[0];
  }

  public findAll() {
    return this.userModel.findAll();
  }

  public findOne(id: number) {
    return this.userModel.findOne({
      where: {
        id,
      },
    });
  }
}
