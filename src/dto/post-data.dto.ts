import { IsNotEmpty, IsString, Length } from 'class-validator';

export class PostDataRequestDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  data: string;
} 