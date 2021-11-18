import { IsNumber } from 'class-validator';

export class CreateHistroyDto {
  @IsNumber()
  deer_name: number;
}
