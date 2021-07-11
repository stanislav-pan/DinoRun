import {
  BelongsTo,
  Column,
  ForeignKey,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { Optional } from 'sequelize/types';
import { User } from 'src/modules/users/models/user.model';
import { SiteTheme } from './site-theme.model';

export class UserThemeAttributes {
  public id: number;
  public themeId: number;
  public ownerId: number;
}

interface UserThemeCreationAttributes
  extends Optional<UserThemeAttributes, 'id'> {}

@Table({
  timestamps: false,
  paranoid: true,
})
export class UserTheme extends Model<
  UserThemeAttributes,
  UserThemeCreationAttributes
> {
  @ForeignKey(() => SiteTheme)
  @Column({
    allowNull: false,
  })
  themeId: number;

  @ForeignKey(() => User)
  @Column({
    allowNull: false,
  })
  ownerId: number;

  @BelongsTo(() => SiteTheme, 'themeId')
  theme: SiteTheme;

  @BelongsTo(() => User, 'ownerId')
  user: User;
}
