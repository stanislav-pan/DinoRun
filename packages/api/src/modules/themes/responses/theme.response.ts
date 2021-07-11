import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ThemeResponse {
  @Expose()
  @ApiProperty()
  public id: number;

  @Expose()
  @ApiProperty()
  public theme: string;

  @Expose()
  @ApiProperty()
  public description: string;
}
