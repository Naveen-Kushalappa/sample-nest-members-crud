import { IsEmail, IsNotEmpty, IsOptional, IsInt, Min } from 'class-validator';

export class CreateMemberDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  age?: number;
}
