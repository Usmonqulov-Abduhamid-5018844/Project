import { Global, Module } from '@nestjs/common';
import { PrizmaService } from './prizma.service';

@Global()
@Module({
  providers: [PrizmaService],
  exports:[PrizmaService]
})
export class PrizmaModule {}
