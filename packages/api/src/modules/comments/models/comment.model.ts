import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import {
  AfterFind,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Optional } from 'sequelize/types';
import { Reaction } from 'src/modules/reactions/models/reaction.model';
import { Topic } from 'src/modules/topics/models/topic.model';
import { User } from 'src/modules/users/models/user.model';

@Exclude()
export class CommentAttributes {
  @Expose()
  @ApiProperty()
  public id: number;

  public userId: number;
  public topicId: number;
  public parentId?: number;

  @Expose()
  @ApiProperty()
  public text: string;

  @Expose()
  @ApiProperty()
  public createdAt?: string;

  public updatedAt?: string;
}

interface CommentCreationAttributes extends Optional<CommentAttributes, 'id'> {}

@Table
export class Comment extends Model<
  CommentAttributes,
  CommentCreationAttributes
> {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => Topic)
  @Column
  topicId: number;

  @Column({
    allowNull: true,
  })
  parentId: number;

  @Column
  text: string;

  @BelongsTo(() => Topic, 'topicId')
  topic: Topic;

  @BelongsTo(() => User, 'userId')
  user: User;

  @HasMany(() => Reaction)
  reactions: Reaction[];

  @Column(DataType.VIRTUAL)
  children: Comment[];
}
