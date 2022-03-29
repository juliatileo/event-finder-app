import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateEventBody {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  organizer: string;

  @IsNotEmpty()
  @IsDateString()
  date: string;
}
