import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { PrizmaModule } from './prizma/prizma.module';
import { UserModule } from './user/user.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'Upload'),
      serveRoot: '/Upload',
    }),
    JwtModule.register({
      global: true,
    }),
    PrizmaModule,
    CategoryModule,
    ProductModule,
    UserModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
