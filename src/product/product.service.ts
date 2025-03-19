import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrizmaService } from 'src/prizma/prizma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrizmaService) {}

  create(data: CreateProductDto) {
    return this.prisma.categort.create({ data });
  }

  findAll() {
    return this.prisma.categort.findMany();
  }

  findOne(id: number) {
    return this.prisma.categort.findUnique({ where: { id } });
  }

  update(id: number, data: UpdateProductDto) {
    let category = this.prisma.categort.findUnique({ where: { id } });
    if (!category) {
      return 'Not found category';
    }
    return this.prisma.categort.updateManyAndReturn({ where: { id }, data });
  }

  remove(id: number) {
    let product = this.prisma.categort.findUnique({ where: { id } });
    if (!product) {
      return 'Not Fount category';
    }
    return this.prisma.categort.delete({ where: { id } });
  }
}
