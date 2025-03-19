import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { PrizmaModule } from './prizma/prizma.module';
import { UserModule } from './user/user.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import {join} from "path"

@Module({
  imports: [ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'Upload'),
    serveRoot: "/Upload"
  }),
    PrizmaModule, CategoryModule, ProductModule, UserModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
