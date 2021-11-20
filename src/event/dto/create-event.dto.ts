import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateEventDto {
  @IsBoolean()
  is_use: boolean;

  @IsString()
  condition_field: string;

  @IsString()
  condition_eq: string;

  @IsString()
  condition_value: string;

  @IsString()
  plus_minus: string;

  @IsNumber()
  applied_number: number;

  @IsString()
  title: string;
}
