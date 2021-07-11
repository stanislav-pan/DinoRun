import { IsString, MinLength } from 'class-validator';

export class CreateTopicDto {
  @MinLength(5)
  @IsString()
  name: string;

  @MinLength(10)
  @IsString()
  description: string;
}
