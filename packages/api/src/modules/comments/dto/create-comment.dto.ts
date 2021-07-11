import { IsNumber, IsString, MinLength, IsOptional } from 'class-validator';

export class CreateCommentDto {
  @IsNumber()
  topicId: number;

  @MinLength(1)
  @IsString()
  text: string;

  @IsOptional()
  @IsNumber()
  parentId?: number;
}
