import { IsBoolean } from 'class-validator';

export class UpdateEventDto {
  @IsBoolean()
  is_use: boolean;
}
