import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { PrizmaModule } from './prizma/prizma.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [PrizmaModule, CategoryModule, ProductModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
