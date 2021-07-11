import { IsNumber } from 'class-validator';

export class UpdateThemeDto {
  @IsNumber()
  themeId: number;
}
