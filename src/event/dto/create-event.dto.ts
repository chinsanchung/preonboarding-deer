import {
  IsBoolean,
  IsNumber,
  IsNumber,
  IsOptional,
  IsString,
  IsString,
} from 'class-validator';

export class CreateEventDto {
  @IsBoolean()
  id: number;

  @IsNumber()
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
