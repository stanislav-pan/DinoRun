import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Optional } from 'sequelize/types';
import { User } from 'src/modules/users/models/user.model';
import { Reaction } from './reaction.model';

export class ReactionUserAttributes {
  public id: number;
  public userId: number;
  public reactionId: number;
}

interface ReactionUserCreationAttributes
  extends Optional<ReactionUserAttributes, 'id'> {}

@Table({
  timestamps: false,
})
export class ReactionUser extends Model<
  ReactionUserAttributes,
  ReactionUserCreationAttributes
> {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User, 'userId')
  user: User;

  @ForeignKey(() => Reaction)
  @Column
  reactionId: number;

  @BelongsTo(() => Reaction, 'reactionId')
  reaction: Reaction;

  @Column(DataType.VIRTUAL(DataType.STRING))
  get userName(): string {
    return this.user?.displayName;
  }
}
