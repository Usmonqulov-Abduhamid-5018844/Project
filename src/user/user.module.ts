import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports:[JwtModule.register({
    global: true,
    secret: "Abduhamid",
    signOptions:{expiresIn: "1d"}
  }),
  MailModule,
],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
