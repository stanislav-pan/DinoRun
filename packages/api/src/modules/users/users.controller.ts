import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiSuccessedResponse } from 'src/core/models/api-response';
import { ApiExtraModels } from '@nestjs/swagger';
import { UserResponse } from './responses/user.response';
import { plainToClass } from 'class-transformer';
import { UserAttributes } from './models/user.model';

@Controller('users')
@ApiExtraModels(UserResponse)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /** Возвращает информацию о всех пользователях, которые когда-либо создавали топики / оставляли комментарии */
  @Get()
  @ApiSuccessedResponse([UserResponse])
  public async findAll(): Promise<UserResponse[]> {
    const users = await this.usersService.findAll();

    return plainToClass(UserResponse, users, {});
  }

  /** Возвращает информацию о пользователе по заданному id */
  @Get(':id')
  @ApiSuccessedResponse(UserResponse)
  public async findOne(@Param('id') id: string): Promise<UserResponse> {
    const user = await this.usersService.findOne(+id);

    return plainToClass(UserAttributes, user);
  }
}
