import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrizmaService } from 'src/prizma/prizma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrizmaService) {}

  async create(data: CreateProductDto) {
    return await this.prisma.product.create({data})
  }

  async findAll() {
    let product = await this.prisma.product.findMany();
    if (!product.length) {
      return { Message: 'Product Not found' };
    }
    return product;
  }

  async findOne(id: string) {
    let product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) {
      return { Message: 'Not found product' };
    }
    return product;
  }

  async update(id: string, data: UpdateProductDto) {
    let product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) {
      return 'Not found product';
    }
    return await this.prisma.product.update({ where: { id },data });
  }

  async remove(id: string) {
    let product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) {
      return 'Not Fount product';
    }
    return await this.prisma.product.delete({ where: { id } });
  }
}
