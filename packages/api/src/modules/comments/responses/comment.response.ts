import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { ReactionResponse } from 'src/modules/reactions/responses/reaction.response';
import { CommonUserData } from 'src/modules/users/responses/user.response';
import { CommentAttributes } from '../models/comment.model';

@Exclude()
export class CommentResponse extends CommentAttributes {
  @Type(() => CommonUserData)
  @Expose()
  @ApiProperty()
  public user: CommonUserData;
}

@Exclude()
class ExtendedComment extends CommentAttributes {
  @Expose()
  @ApiProperty()
  public userId: number;

  @Type(() => ReactionResponse)
  @Expose()
  @ApiProperty({
    type: [ReactionResponse],
  })
  public reactions: ReactionResponse[];

  @Type(() => ExtendedComment)
  @Expose()
  @ApiProperty({
    type: [ExtendedComment],
  })
  public children: ExtendedComment[];
}

@Exclude()
export class FindAllResponse {
  @Type(() => ExtendedComment)
  @Expose()
  @ApiProperty({
    type: [ExtendedComment],
  })
  public comments: ExtendedComment[];

  @Type(() => CommonUserData)
  @Expose()
  @ApiProperty({
    type: [CommonUserData],
  })
  public users: CommonUserData[];
}
