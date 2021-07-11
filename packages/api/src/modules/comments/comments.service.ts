import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AuthorizedUserData } from 'src/core/decorators/user.decorator';
import { ReactionUser } from '../reactions/models/reaction-user.model';
import { Reaction } from '../reactions/models/reaction.model';
import { TopicsService } from '../topics/topics.service';
import { User } from '../users/models/user.model';
import { CreateCommentDto } from './dto/create-comment.dto';
import { FindAllCommentsDto } from './dto/find-all-comments.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './models/comment.model';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment) private commentModel: typeof Comment,
    private topicsService: TopicsService,
  ) {}

  public async create(
    createCommentDto: CreateCommentDto,
    user: AuthorizedUserData,
  ) {
    const { topicId, text, parentId } = createCommentDto;

    const topic = await this.topicsService.findOne(topicId);

    if (!topic) {
      throw new NotFoundException('Topic not found');
    }

    const createdComment = await this.commentModel.create({
      topicId,
      text,
      userId: user.id,
      parentId,
    });

    return createdComment;
  }

  public findAll(filters: FindAllCommentsDto) {
    return Comment.findAll({
      include: [
        User,
        {
          model: Reaction,
          include: [
            {
              model: ReactionUser,
              include: [User],
            },
          ],
        },
      ],
      where: {
        topicId: filters.topicId,
      },
    });
  }

  public findOne(id: number) {
    return Comment.findOne({ include: [User], where: { id: +id } });
  }

  public async update(
    id: number,
    updateCommentDto: UpdateCommentDto,
    user: AuthorizedUserData,
  ) {
    await this.hasAccessToComment(id, user);

    const { text } = updateCommentDto;

    const [_, comments] = await this.commentModel.update(
      { text },
      { where: { id } },
    );

    if (!comments.length) {
      throw new NotFoundException('Comment not found');
    }

    return comments[0];
  }

  public async remove(id: number, user: AuthorizedUserData) {
    await this.hasAccessToComment(id, user);

    return this.commentModel.destroy({
      where: {
        id,
      },
    });
  }

  public splitCommentsAndUsers(comments: Comment[]) {
    const mappedUsers: Map<string, User> = new Map();

    comments.forEach((comment) => {
      const { user } = comment;

      if (mappedUsers.has(String(user?.id))) {
        return;
      }

      mappedUsers.set(String(user.id), user);
    });

    return {
      comments,
      users: Array.from(mappedUsers.values()),
    };
  }

  public async isExist(id: number, throwError = true) {
    const entity = await this.findOne(id);

    if (throwError && !entity) {
      throw new NotFoundException('Comment not found');
    }

    return !!entity;
  }

  private async hasAccessToComment(
    commentId: number,
    user: AuthorizedUserData,
  ) {
    const comment = await this.commentModel.findOne({
      where: {
        id: commentId,
      },
      include: [User],
    });

    if (!comment) {
      throw new NotFoundException();
    }

    if (comment.user?.externalUserId !== user.id) {
      throw new ForbiddenException();
    }
  }
}
