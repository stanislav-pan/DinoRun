import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { plainToClass } from 'class-transformer';
import { Transaction } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { ApiResponseModel } from 'src/core/models/api-response';
import { CommentsService } from '../comments/comments.service';
import { User } from '../users/models/user.model';
import { CreateReactionDto } from './dto/create-reaction.dto';
import { ReactionResponse } from './responses/reaction.response';
import { ReactionUser } from './models/reaction-user.model';
import { Reaction } from './models/reaction.model';
import { AuthorizedUserData } from 'src/core/decorators/user.decorator';

@Injectable()
export class ReactionsService {
  constructor(
    @InjectModel(Reaction) private reactionModel: typeof Reaction,
    @InjectModel(ReactionUser) private reactionUserModel: typeof ReactionUser,
    private commentsService: CommentsService,
    private sequelize: Sequelize,
  ) {}

  public async create(
    { commentId, emojiId }: CreateReactionDto,
    user: AuthorizedUserData,
  ) {
    await this.commentsService.isExist(commentId);

    return this.sequelize.transaction(async (transaction: Transaction) => {
      const [reaction] = await this.reactionModel.findOrCreate({
        where: {
          emojiId,
          commentId,
        },
        defaults: {
          commentId,
          emojiId,
        },
        transaction,
      });

      const [reactionUser, isNew] = await this.reactionUserModel.findOrCreate({
        where: {
          userId: user.id,
          reactionId: reaction.id,
        },
        defaults: {
          userId: user.id,
          reactionId: reaction.id,
        },
        transaction,
      });

      if (!isNew) {
        throw new ConflictException(
          'Пользователь не может добавлять реакции одного типа',
        );
      }

      return { reaction, reactionUser };
    });
  }

  public findAll(commentId: number) {
    return Reaction.findAll({
      include: [
        {
          model: ReactionUser,
          include: [User],
        },
      ],
      where: {
        commentId,
      },
    });
  }

  public findOne(id: number) {
    return Reaction.findOne({ where: { id: +id } });
  }

  public async remove(reactionId: number, user: AuthorizedUserData) {
    return this.sequelize.transaction(async (transaction: Transaction) => {
      const reactionUser = await this.reactionUserModel.findOne({
        where: {
          reactionId,
          userId: user.id,
        },
      });

      if (!reactionUser) {
        throw new NotFoundException(
          'Реакция пользователя с заданным id не найдена',
        );
      }

      await reactionUser.destroy({
        transaction,
      });

      const reaction = await this.reactionModel.findOne({
        include: [ReactionUser],
        where: {
          id: reactionId,
        },
        transaction,
      });

      const commentId = reaction.commentId;

      if (!reaction.reactionUsers.length) {
        reaction.destroy({
          transaction,
        });
      }

      return { commentId };
    });
  }

  public async generateResponse(commentId: number) {
    const reactions = await this.findAll(commentId);

    const res = plainToClass(ReactionResponse, reactions);
    return res;
  }
}
