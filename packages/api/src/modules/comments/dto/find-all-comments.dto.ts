import { IsString } from 'class-validator';

export class FindAllCommentsDto {
  @IsString()
  topicId: number;
}
