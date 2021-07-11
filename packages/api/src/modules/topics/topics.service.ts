import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AuthorizedUserData } from 'src/core/decorators/user.decorator';
import { Comment } from '../comments/models/comment.model';
import { User } from '../users/models/user.model';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { Topic } from './models/topic.model';

@Injectable()
export class TopicsService {
  constructor(@InjectModel(Topic) private topicModel: typeof Topic) {}

  public async create(
    createTopicDto: CreateTopicDto,
    user: AuthorizedUserData,
  ) {
    const { name, description } = createTopicDto;

    const createdTopic = await this.topicModel.create({
      userId: user.id,
      name,
      description,
    });

    return createdTopic;
  }

  public async findAll() {
    const topics = await Topic.findAll({
      include: [Comment, User],
    });

    return topics;
  }

  public async findOne(id: number) {
    const topic = await Topic.findOne({
      include: [Comment, User],
      where: { id: +id },
    });

    if (!topic) {
      throw new NotFoundException('topic not found');
    }

    return topic;
  }

  public async update(
    id: number,
    updateTopicDto: UpdateTopicDto,
    user: AuthorizedUserData,
  ) {
    await this.hasAccessToTopic(id, user);

    const { name, description } = updateTopicDto;

    const [_, topics] = await this.topicModel.update(
      { name, description },
      { where: { id } },
    );

    if (!topics.length) {
      throw new NotFoundException('Comment not found');
    }

    return topics[0];
  }

  public async remove(id: number, user: AuthorizedUserData) {
    await this.hasAccessToTopic(id, user);

    return await this.topicModel.destroy({
      where: {
        id,
      },
    });
  }

  private async hasAccessToTopic(topicId: number, user: AuthorizedUserData) {
    const topic = await this.topicModel.findOne({
      where: {
        id: topicId,
      },
      include: [User],
    });

    if (!topic) {
      throw new NotFoundException();
    }

    if (topic.user?.externalUserId !== user.id) {
      throw new ForbiddenException();
    }
  }
}
