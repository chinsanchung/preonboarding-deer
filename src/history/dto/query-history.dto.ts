import { IsOptional, IsString } from 'class-validator';

export class QueryHistoryDto {
  @IsString()
  @IsOptional()
  page: string;

  @IsString()
  @IsOptional()
  limit: string;
}
