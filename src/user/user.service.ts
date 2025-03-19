import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';
import { PrizmaService } from 'src/prizma/prizma.service';
import * as bcrypt from "bcrypt"

@Injectable()
export class UserService {
  constructor(
    private Jwt: JwtService,
    private prisma: PrizmaService,
  ) {}

  async register(data: CreateUserDto) {
    let { email, password } = data;
    let user = await this.prisma.user.findFirst({ where: { email } });
    if (user) {
      return { Message: 'Olrediy exists' };
    }
    data.password = bcrypt.hashSync(password, 10);

    return await this.prisma.user.create({ data: data });
  }
  async login(data: UpdateUserDto) {
    let { email, password } = data;
    let user = await this.prisma.user.findFirst({ where: { email } });
    if (!user) {
      return { Message: 'Not Fount user' };
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return { Message: 'Wrong password' };
    }
    let sesion = await this.prisma.sesion.findFirst({
      where: { api: data.api, userId: user.id },
    });
    if (!sesion) {
      await this.prisma.sesion.create({
        data: { api: data.api, userId: user.id },
      });
    }

    return { Token: this.Jwt.sign({ id: user.id, role: user.role }) };
  }
  async findAll() {
    let user = await this.prisma.user.findMany();
    if (!user.length) {
      return { MEssage: 'User not found' };
    }
    return user;
  }

  async findOne(id: string) {
    let user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      return { MEssage: 'User not found' };
    }
    return user;
  }
  async sesions(req: Request) {
    let id = req['user'].id;
    let sesion = await this.prisma.sesion.findMany({ where: { userId: id } });
    if (!sesion.length) {
      return { Message: 'Not Found sesion' };
    }
    return sesion;
  }
  async me(api: string, req: Request) {
    let id = req['user'].id;

    let sesion = await this.prisma.sesion.findFirst({
      where: { api: api, userId: id },
    });
    if (!sesion) {
      throw new UnauthorizedException('Sesion not found');
    }
    return sesion;
  }
  async deletSesion(id: string) {
    let sesion = await this.prisma.sesion.findUnique({ where: {id} });
    if (!sesion) {
      return { Mssage: 'Not found sesion' };
    }
    return await this.prisma.sesion.delete({ where: { id } });
  }
}
