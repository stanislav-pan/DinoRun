import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Optional } from 'sequelize/types';
import { Comment } from 'src/modules/comments/models/comment.model';
import { ReactionUser } from './reaction-user.model';

export class ReactionAttributes {
  public id: number;
  public emojiId: string;
  public commentId: number;
}

interface ReactionCreationAttributes
  extends Optional<ReactionAttributes, 'id'> {}

@Table({
  timestamps: false,
})
export class Reaction extends Model<
  ReactionAttributes,
  ReactionCreationAttributes
> {
  @ForeignKey(() => Comment)
  @Column
  commentId: number;

  @BelongsTo(() => Comment, 'commentId')
  comment: Comment;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  emojiId: string;

  @HasMany(() => ReactionUser, 'reactionId')
  reactionUsers: ReactionUser[];
}
