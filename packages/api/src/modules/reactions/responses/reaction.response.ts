import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
class ReactionUserResponse {
  @Expose()
  @ApiProperty()
  public userName: string;
}

@Exclude()
export class ReactionResponse {
  @Expose()
  @ApiProperty()
  public id: string;

  @Expose()
  @ApiProperty()
  public emojiId: string;

  @Type(() => ReactionUserResponse)
  @Expose()
  @ApiProperty({
    type: ReactionUserResponse,
  })
  public reactionUsers: ReactionUserResponse;
}
