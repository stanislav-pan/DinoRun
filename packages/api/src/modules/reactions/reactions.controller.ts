import { Controller, Post, Body, Param, Delete } from '@nestjs/common';
import { ReactionsService } from './reactions.service';
import { CreateReactionDto } from './dto/create-reaction.dto';
import { ReactionAttributes } from './models/reaction.model';
import { ApiExtraModels } from '@nestjs/swagger';
import { ReactionResponse } from './responses/reaction.response';
import {
  ApiErroredResponse,
  ApiSuccessedResponse,
} from 'src/core/models/api-response';
import {
  AuthorizedUser,
  AuthorizedUserData,
} from 'src/core/decorators/user.decorator';

@Controller('reactions')
@ApiExtraModels(ReactionResponse, ReactionAttributes)
export class ReactionsController {
  constructor(private readonly reactionsService: ReactionsService) {}

  @Post()
  @ApiSuccessedResponse(ReactionResponse, 201)
  @ApiErroredResponse(
    [String],
    400,
    'Код состояния 400 указывает на то, что сервер не понял запрос из-за неправильно переданных параметров.',
  )
  @ApiErroredResponse(String, 404, 'Комментарий с заданным id не был найден')
  public async create(
    @Body() createReactionDto: CreateReactionDto,
    @AuthorizedUser() user: AuthorizedUserData,
  ): Promise<ReactionResponse[]> {
    await this.reactionsService.create(createReactionDto, user);

    return this.reactionsService.generateResponse(createReactionDto.commentId);
  }

  /** Удаляет реакцию пользователя */
  @Delete(':id')
  @ApiSuccessedResponse(ReactionResponse)
  public async remove(
    @Param('id') id: string,
    @AuthorizedUser() user: AuthorizedUserData,
  ): Promise<ReactionResponse[]> {
    const { commentId } = await this.reactionsService.remove(+id, user);

    return this.reactionsService.generateResponse(commentId);
  }
}
