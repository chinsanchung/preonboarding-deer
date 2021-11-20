import { IsNumber } from 'class-validator';

export class UpdateHistroyDto {
  @IsNumber()
  deer_name: number;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;
}
