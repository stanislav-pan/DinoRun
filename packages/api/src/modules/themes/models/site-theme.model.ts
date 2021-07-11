import { Column, Index, Model, Table } from 'sequelize-typescript';
import { Optional } from 'sequelize/types';

export class SiteThemeAttributes {
  public id: number;
  public theme: string;
  public description: string;
  public isDefault: boolean;
}

interface SiteThemeCreationAttributes
  extends Optional<SiteThemeAttributes, 'id'> {}

@Table({
  timestamps: false,
  paranoid: true,
})
export class SiteTheme extends Model<
  SiteThemeAttributes,
  SiteThemeCreationAttributes
> {
  @Index
  @Column({
    allowNull: false,
    unique: true,
  })
  theme: string;

  @Column({
    allowNull: false,
  })
  description: string;

  @Column({
    allowNull: false,
  })
  isDefault: boolean;
}
