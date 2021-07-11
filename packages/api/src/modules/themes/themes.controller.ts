import { Controller, Get, Body, Patch } from '@nestjs/common';
import { ThemesService } from './themes.service';
import { UpdateThemeDto } from './dto/update-user-theme.dto';
import {
  AuthorizedUser,
  AuthorizedUserData,
} from 'src/core/decorators/user.decorator';
import {
  ApiResponseModel,
  ApiSuccessedResponse,
} from 'src/core/models/api-response';
import { ThemeResponse } from './responses/theme.response';
import { ApiExtraModels } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';

@Controller('themes')
@ApiExtraModels(ThemeResponse)
export class ThemesController {
  constructor(private readonly themesService: ThemesService) {}

  /** Возвращает список всех тем, присутствуюших в системе */
  @Get()
  @ApiSuccessedResponse([ThemeResponse])
  public async findAll() {
    const themes = await this.themesService.findAll();

    const res = plainToClass(ThemeResponse, themes);
    return res;
  }

  /** Возвращает тему для текущего пользователя */
  @Get('user')
  @ApiSuccessedResponse(ThemeResponse)
  public async findUserTheme(@AuthorizedUser() user: AuthorizedUserData) {
    const theme = await this.themesService.findUserTheme(user);

    const res = plainToClass(ThemeResponse, theme);
    return res;
  }

  /** Изменяет тему для текущего пользователя */
  @Patch('user')
  @ApiSuccessedResponse(ThemeResponse)
  public async update(
    @Body() updateThemeDto: UpdateThemeDto,
    @AuthorizedUser() user: AuthorizedUserData,
  ) {
    const theme = await this.themesService.selectTheme(
      user,
      updateThemeDto.themeId,
    );

    const res = plainToClass(ThemeResponse, theme);
    return res;
  }
}
