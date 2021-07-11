import { IsNumber, IsString } from 'class-validator';

export class CreateReactionDto {
  @IsNumber()
  commentId: number;

  @IsString()
  emojiId: string;
}
