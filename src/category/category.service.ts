import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrizmaService } from 'src/prizma/prizma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrizmaService) {}

  create(data: CreateCategoryDto) {
    return this.prisma.categort.create({ data });
  }

  findAll() {
    return this.prisma.categort.findMany()
  }

  findOne(id: number) {
    return this.prisma.categort.findUnique({ where: { id } });
  }

  update(id: number, data: UpdateCategoryDto) {
    let category = this.prisma.categort.findUnique({where:{id}});
    if (!category) {
      return 'Not found category';
    }
    return this.prisma.categort.updateManyAndReturn({where: {id},data});
  }

  remove(id: number) {
    let product = this.prisma.categort.findUnique({where: {id}})
    if(!product){
      return "Not Fount category"
    }
    return this.prisma.categort.delete({where: {id}})
  }
}
