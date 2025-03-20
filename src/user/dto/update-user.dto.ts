import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: 'usmonqulovabduhamid00@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '12345678' })
  @IsNotEmpty()
  @Length(4, 8)
  password: string;

  @ApiProperty({ example: '123.54.34' })
  @IsNotEmpty()
  api: string;
}

export class verifiEmile {
  @ApiProperty({ example: 'usmonqulovabduhamid00@gmail.com' })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}
