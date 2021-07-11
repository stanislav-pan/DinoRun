import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TopicsService } from './topics.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import {
  ApiErroredResponse,
  ApiSuccessedResponse,
} from 'src/core/models/api-response';
import { ApiExtraModels } from '@nestjs/swagger';
import { TopicResponse } from './responses/topic.response';
import { plainToClass } from 'class-transformer';
import { TopicAttributes } from './models/topic.model';
import {
  AuthorizedUser,
  AuthorizedUserData,
} from 'src/core/decorators/user.decorator';

@Controller('topics')
@ApiExtraModels(TopicResponse, TopicAttributes)
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Post()
  @ApiSuccessedResponse(TopicAttributes, 201)
  public async create(
    @Body() createTopicDto: CreateTopicDto,
    @AuthorizedUser() user: AuthorizedUserData,
  ): Promise<TopicAttributes> {
    const topic = await this.topicsService.create(createTopicDto, user);

    return plainToClass(TopicAttributes, topic);
  }

  @Get()
  @ApiSuccessedResponse([TopicResponse])
  public async findAll(): Promise<TopicResponse[]> {
    const topics = await this.topicsService.findAll();

    const mappedTopics = topics.map((topic) => {
      const plainTopic = topic.get({ plain: true });

      return { ...plainTopic, commentsCount: topic.comments.length };
    });

    return plainToClass(TopicResponse, mappedTopics);
  }

  @Get(':id')
  @ApiSuccessedResponse(TopicResponse)
  public async findOne(@Param('id') id: string): Promise<TopicResponse> {
    const topic = await this.topicsService.findOne(+id);

    return plainToClass(TopicResponse, {
      ...topic.get({ plain: true }),
      commentsCount: topic.comments.length,
    });
  }

  @Patch(':id')
  @ApiSuccessedResponse(TopicResponse)
  @ApiErroredResponse('string', 403, 'У пользователя недостаточно прав')
  @ApiErroredResponse('string', 404, 'Топик не найден')
  public async update(
    @Param('id') id: string,
    @Body() updateTopicDto: UpdateTopicDto,
    @AuthorizedUser() user: AuthorizedUserData,
  ): Promise<TopicResponse> {
    const topic = await this.topicsService.update(+id, updateTopicDto, user);

    return plainToClass(TopicResponse, topic);
  }

  @Delete(':id')
  @ApiSuccessedResponse('boolean')
  @ApiErroredResponse('string', 403, 'У пользователя недостаточно прав')
  @ApiErroredResponse('string', 404, 'Топик не найден')
  public async remove(
    @Param('id') id: string,
    @AuthorizedUser() user: AuthorizedUserData,
  ): Promise<boolean> {
    await this.topicsService.remove(+id, user);
    return true;
  }
}
