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
import { User } from 'src/modules/users/models/user.model';

@Exclude()
export class TopicAttributes {
  @Expose()
  @ApiProperty()
  public id: number;

  public userId: number;

  @Expose()
  @ApiProperty()
  public name: string;

  @Expose()
  @ApiProperty()
  public description: string;

  public createdAt?: string;

  public updatedAt?: string;
}

interface TopicCreationAttributes extends Optional<TopicAttributes, 'id'> {}

@Table
export class Topic extends Model<TopicAttributes, TopicCreationAttributes> {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  userId: number;

  @BelongsTo(() => User, 'userId')
  user: User;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @HasMany(() => Comment)
  comments: Comment[];
}
