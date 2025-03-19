import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';
import { PrizmaService } from 'src/prizma/prizma.service';

@Injectable()
export class UserService {
  constructor(
    private Jwt: JwtService,
    private prisma: PrizmaService,
  ) {}

  async register(data: CreateUserDto) {
    let { email, password } = data;
    let  user = await this.prisma.user.findFirst({ where: { email } });
    if(user){
      return {Message: "Siz ro'yhaddan o'tgansiz"}
    }
    
  }
  async login(data: UpdateUserDto) {}

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
