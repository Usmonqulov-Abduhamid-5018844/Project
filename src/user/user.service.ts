import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto, verifiEmile } from './dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';
import { PrizmaService } from 'src/prizma/prizma.service';
import * as bcrypt from 'bcrypt';
import { MailService } from 'src/mail/mail.service';
import { totp } from 'otplib';
import { Request } from 'express';

totp.options = { step: 300 };
@Injectable()
export class UserService {
  constructor(
    private Jwt: JwtService,
    private prisma: PrizmaService,
    private mailer: MailService,
  ) {}

  async register(data: CreateUserDto) {
    let { email, password } = data;
    let user = await this.prisma.user.findFirst({ where: { email } });
    if (user) {
      return { Message: 'Olrediy exists' };
    }
    data.password = bcrypt.hashSync(password, 10);

    let otp = totp.generate('Secret');
    await this.mailer.sendMail(
      `${email}`,
      'Acaunt activirvt',
      `Please activate your account ${otp}`,
    );
    await this.prisma.user.create({ data });
    return { Message: 'IsActivate your account.' };
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
    if (!user.IsActive) {
      throw new BadRequestException(
        'Your account is not active. Please activate your account.',
      );
    }
    let sesion = await this.prisma.sesion.findFirst({
      where: { api: data.api, userId: user.id },
    });
    if (!sesion) {
      await this.prisma.sesion.create({
        data: { api: data.api, userId: user.id },
      });
    }

    let accsesToken = this.AccesesToken({ id: user.id, role: user.role });
    let refreshToken = this.RefreshToken({ id: user.id, role: user.role });
    return { accsesToken, refreshToken };
  }

  async verify(otp: string, data: verifiEmile) {
    if (!otp) {
      throw new BadRequestException('Not fuont otp');
    }
    let user = await this.prisma.user.findFirst({
      where: { email: data.email },
    });
    if (!user) {
      throw new BadRequestException('Not fount email');
    }
    if (!totp.check(otp, 'Secret')) {
      throw new BadRequestException('Wrong otp');
    }
    try {
      let active = await this.prisma.user.update({
        where: { id: user.id },
        data: { IsActive: true },
      });
      return active;
    } catch (errpr) {
      throw new BaseAudioContext();
    }
  }

  async sendOtp(data: string) {
    let user = await this.prisma.user.findFirst({
      where: { email: data },
    });
    if (!user) {
      return { Message: 'Not Found Email' };
    }
    let otp = totp.generate('Secret');
    await this.mailer.sendMail(
      `${user.email}`,
      'Acaunt activirvt',
      `Please activate your account ${otp}`,
    );
    return { Message: 'IsActivate your account Email.' };
  }
  async refreshToken(req: Request) {
    let id = req['user'].id;
    let user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new BadRequestException();
    }
    return { accsestoken: this.AccesesToken({ id: user.id, role: user.role }) };
  }

  async Add_admin(userId: string) {
    let user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return { Message: 'Not Found user' };
    }
    let update = await this.prisma.user.update({
      where: { id: user.id },
      data: {role: "ADMIN"},
    });
    return update
  }

  async findAll() {
    let user = await this.prisma.user.findMany();
    if (!user.length) {
      return { Message: 'User not found' };
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
      throw new UnauthorizedException();
    }
    return sesion;
  }
  async deletSesion(id: string) {
    let sesion = await this.prisma.sesion.findUnique({ where: { id } });
    if (!sesion) {
      return { Mssage: 'Not found sesion' };
    }
    return await this.prisma.sesion.delete({ where: { id } });
  }

  AccesesToken(peload: { id: string; role: string }) {
    return this.Jwt.sign(peload, {
      secret: 'accsesToken',
      expiresIn: '60m',
    });
  }
  RefreshToken(peload: { id: string; role: string }) {
    return this.Jwt.sign(peload, {
      secret: 'refreshToken',
      expiresIn: '7d',
    });
  }
}
