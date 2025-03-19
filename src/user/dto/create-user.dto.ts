import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Alex' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '+998930451852' })
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({ example: 'usmonqulovabduhamid00@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '12345678' })
  @IsNotEmpty()
  @Length(4, 8)
  password: string;
}
