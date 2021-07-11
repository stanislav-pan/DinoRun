import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AuthorizedUserData } from 'src/core/decorators/user.decorator';
import { SiteTheme, SiteThemeAttributes } from './models/site-theme.model';
import { UserTheme } from './models/user-theme.model';

@Injectable()
export class ThemesService {
  constructor(
    @InjectModel(SiteTheme) private siteThemeModel: typeof SiteTheme,
    @InjectModel(UserTheme) private userThemeModel: typeof UserTheme,
  ) {
    this.createStandartThemes();
  }

  public findAll() {
    return this.siteThemeModel.findAll();
  }

  public async findUserTheme(user: AuthorizedUserData) {
    const userTheme = await this.userThemeModel.findOne({
      include: [SiteTheme],
      where: {
        ownerId: user.id,
      },
    });

    return userTheme.theme;
  }

  /** Устанавливает дефолтную тему при создании пользователя */
  public async selectDefaultTheme(userId: number) {
    const theme = await this.findDefaultTheme();

    return await this.userThemeModel.create({
      ownerId: userId,
      themeId: theme.id,
    });
  }

  public async selectTheme(user: AuthorizedUserData, themeId?: number) {
    return this.userThemeModel.update(
      {
        themeId,
      },
      {
        where: {
          ownerId: user.id,
        },
      },
    );
  }

  private findDefaultTheme() {
    return this.siteThemeModel.findOne({
      where: {
        isDefault: true,
      },
    });
  }

  private async createStandartThemes() {
    const themes = await this.siteThemeModel.findAll();

    if (themes.length) {
      return;
    }

    const newThemes: Omit<SiteThemeAttributes, 'id'>[] = [
      {
        theme: 'LIGHT',
        description: 'Стандартная светлая тема',
        isDefault: true,
      },
      {
        theme: 'DARK',
        description: 'Модная тёмная тема',
        isDefault: false,
      },
    ];

    await this.siteThemeModel.bulkCreate(newThemes);
  }
}
