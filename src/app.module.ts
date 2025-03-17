import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DBService } from './services/db-service';
import { DataService } from './services/data-service/index';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, DBService, DataService],
})
export class AppModule {}
