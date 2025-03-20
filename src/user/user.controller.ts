import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, Role } from './dto/create-user.dto';
import { UpdateUserDto, verifiEmile } from './dto/update-user.dto';
import { AuthGuard } from 'src/Guard/auth.guard';
import { emit } from 'process';
import { ApiParam, ApiProperty } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { RefreshGuard } from 'src/Guard/refresh.guard';
import { Request } from 'express';
import { RoleGuard } from 'src/Guard/role.guard';
import { Roles } from 'src/Decorator/role.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }
  @Post('login')
  login(@Body() data: UpdateUserDto) {
    return this.userService.login(data);
  }
  @Patch('verify:otp')
  verify(@Param('otp') otp: string, @Body() data: verifiEmile) {
    if (!data) {
      return { Message: 'Not found email' };
    }
    return this.userService.verify(otp, data);
  }

  @ApiParam({
    name: 'email',
    type: String,
    description: 'Foydalanuvchi email manzili',
    example: 'usmonqulovabduhamid00@gmail.com',
  })
  @Get('sentOtp/:email')
  sendOtp(@Param('email') data: string) {
    return this.userService.sendOtp(data);
  }

  @UseGuards(RefreshGuard)
  @Get('refreshToken')
  refpershToken(@Req() data: Request) {
    return this.userService.refreshToken(data);
  }

  @Roles(Role.ADMIN)
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Patch("add_admin/:userId")
  add_admin(@Param("userId") userId: string ){
    return this.userService.Add_admin(userId)
  }

  @UseGuards(AuthGuard)
  @Get('All')
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('sesions')
  sesions(@Req() req: Request) {
    return this.userService.sesions(req);
  }
  @UseGuards(AuthGuard)
  @Delete('desetSesion/:id')
  deletSesion(@Param('id') id: string) {
    return this.userService.deletSesion(id);
  }
  @UseGuards(AuthGuard)
  @Get('me/:api')
  me(@Param('api') api: string, @Req() req: Request) {
    return this.userService.me(api, req);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }
}
