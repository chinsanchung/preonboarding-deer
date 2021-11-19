import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateEventDto {
  @IsNumber()
  id: number;

  @IsBoolean()
  is_use: number;

  @IsString()
  condition_query: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  plus_minus: string;

  @IsString()
  applied_column: string;

  @IsNumber()
  applied_number: number;
}
