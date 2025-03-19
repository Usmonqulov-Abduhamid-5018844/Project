import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateCategoryDto {
  @ApiProperty({ example: 'name' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'linke' })
  @IsNotEmpty()
  image: string;
}
