import { IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateEventBody {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  organizer?: string;

  @IsOptional()
  @IsDateString()
  date?: string;
}
