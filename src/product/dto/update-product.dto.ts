import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UpdateProductDto {
  @ApiProperty({ example: 'name' })
  name: string;

  @ApiProperty({ example: 2300 })
  @Type(() => Number)
  price: number;

  @ApiProperty({ example: 'Linke' })
  image: string;

  @ApiProperty({ example: 'categoryId' })
  categoryId: string;
}
