import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class CreateProductDto {
    @ApiProperty({example: "name"})
    @IsNotEmpty()
    name: string

    @ApiProperty({example: 2300})
    @IsNotEmpty()
    @Type(()=> Number)
    price: number

    @ApiProperty({example: "Linke"})
    @IsNotEmpty()
    image: string

    @ApiProperty({example:"categoryId"})
    @IsNotEmpty()
    categoryId: string
}
