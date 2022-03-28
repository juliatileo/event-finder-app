import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserBody {
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;
}
