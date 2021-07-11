import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { CommonUserData } from 'src/modules/users/responses/user.response';
import { TopicAttributes } from '../models/topic.model';

@Exclude()
export class TopicResponse extends TopicAttributes {
  @Type(() => CommonUserData)
  @Expose()
  @ApiProperty()
  public user: CommonUserData;

  @Expose()
  @ApiProperty()
  public commentsCount: number;
}
