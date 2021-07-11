import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Optional } from 'sequelize/types';
import { Topic } from 'src/modules/topics/models/topic.model';

@Exclude()
export class UserAttributes {
  @Expose()
  @ApiProperty()
  public id: number;

  public externalUserId: number;

  @Expose()
  @ApiProperty()
  public firstName: string;

  @Expose()
  @ApiProperty()
  public secondName: string;

  @Expose()
  @ApiProperty()
  public displayName: string;

  @Expose()
  @ApiProperty()
  public login: string;

  @Expose()
  @ApiProperty()
  public email: string;

  @Expose()
  @ApiProperty()
  public phone: string;

  @Expose()
  @ApiProperty()
  public avatar: string;

  @Expose()
  @ApiProperty()
  public isActive?: boolean;

  public createdAt?: string;

  public updatedAt?: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

@Table
export class User extends Model<UserAttributes, UserCreationAttributes> {
  @Column({
    unique: true,
  })
  externalUserId: number;

  @Column
  firstName: string;

  @Column
  secondName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  displayName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  login: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @Column
  phone: string;

  @Column
  avatar: string;

  @Column({ defaultValue: true })
  isActive: boolean;

  @HasMany(() => Topic, 'userId')
  topics: Topic[];
}
