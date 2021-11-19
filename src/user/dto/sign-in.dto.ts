import { IsString } from 'class-validator';

export class SignInDto {
  @IsString()
  user_id: string;

  @IsString()
  password: string;
}
