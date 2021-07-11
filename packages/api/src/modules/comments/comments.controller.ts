import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiExtraModels } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { mapArrayToTree } from 'src/core/methods/map-array-to-tree';
import {
  ApiErroredResponse,
  ApiSuccessedResponse,
} from 'src/core/models/api-response';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { FindAllCommentsDto } from './dto/find-all-comments.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentResponse, FindAllResponse } from './responses/comment.response';
import { CommentAttributes } from './models/comment.model';
import {
  AuthorizedUser,
  AuthorizedUserData,
} from 'src/core/decorators/user.decorator';

@Controller('comments')
@ApiExtraModels(CommentResponse, CommentAttributes, FindAllResponse)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @ApiSuccessedResponse(CommentAttributes, 201)
  public async create(
    @Body() createCommentDto: CreateCommentDto,
    @AuthorizedUser() user: AuthorizedUserData,
  ): Promise<CommentAttributes> {
    const comment = await this.commentsService.create(createCommentDto, user);

    return plainToClass(CommentAttributes, comment);
  }

  @Get()
  @ApiSuccessedResponse(FindAllResponse)
  public async findAll(@Query() query: FindAllCommentsDto) {
    const comments = await this.commentsService.findAll(query);
    const splitedData = this.commentsService.splitCommentsAndUsers(comments);
    const mappedSplitedData = {
      comments: mapArrayToTree(splitedData.comments),
      users: splitedData.users,
    };

    return plainToClass(FindAllResponse, mappedSplitedData);
  }

  @Get(':id')
  @ApiSuccessedResponse(CommentResponse)
  public async findOne(@Param('id') id: string): Promise<CommentResponse> {
    const comment = await this.commentsService.findOne(+id);

    return plainToClass(CommentResponse, comment);
  }

  @Patch(':id')
  @ApiSuccessedResponse(CommentResponse)
  @ApiErroredResponse('string', 403, 'У пользователя недостаточно прав')
  @ApiErroredResponse('string', 404, 'Комментарий не найден')
  public async update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
    @AuthorizedUser() user: AuthorizedUserData,
  ): Promise<CommentResponse> {
    const comment = await this.commentsService.update(
      +id,
      updateCommentDto,
      user,
    );

    return plainToClass(CommentResponse, comment);
  }

  @Delete(':id')
  @ApiSuccessedResponse('boolean')
  @ApiErroredResponse('string', 403, 'У пользователя недостаточно прав')
  @ApiErroredResponse('string', 404, 'Комментарий не найден')
  public async remove(
    @Param('id') id: string,
    @AuthorizedUser() user: AuthorizedUserData,
  ): Promise<boolean> {
    await this.commentsService.remove(+id, user);
    return true;
  }
}
