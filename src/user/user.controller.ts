import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/Guard/auth.guard';

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
  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get("sesions")
  sesions(@Req() req: Request){
    return this.userService.sesions(req)
  }
  @UseGuards(AuthGuard)
  @Delete("desetSesion/:id")
  deletSesion(@Param("id") id: string){
    return this.userService.deletSesion(id)
  }
  @UseGuards(AuthGuard)
  @Get('me/:api')
  me(@Param("api") api: string, @Req() req: Request) {
    return this.userService.me(api, req)
  }
  
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param("id") id: string) {
    
    return this.userService.findOne(id);
  }

}
