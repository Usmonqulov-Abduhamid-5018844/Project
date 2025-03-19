import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrizmaService } from 'src/prizma/prizma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrizmaService) {}

  async create(data: CreateCategoryDto) {
    return await this.prisma.categort.create({ data });
  }

  async findAll() {
    let Category = await this.prisma.categort.findMany();
    if (!Category.length) {
      return { Message: 'Category Not found' };
    }
    return Category;
  }

  async findOne(id: string) {
    let Category = await this.prisma.categort.findUnique({ where: { id } });
    if (!Category) {
      return { Message: 'Not found Category' };
    }
    return Category;
  }

  async update(id: string, data: UpdateCategoryDto) {
    let Category = await this.prisma.categort.findUnique({ where: { id } });
    if (!Category) {
      return 'Not found category';
    }
    return await this.prisma.categort.update({ where: { id }, data });
  }

  async remove(id: string) {
    let Category = await this.prisma.categort.findUnique({ where: { id } });
    if (!Category) {
      return 'Not Fount category';
    }
    return await this.prisma.categort.delete({ where: { id } });
  }
}
