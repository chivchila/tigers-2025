import { Controller, Get, Param} from '@nestjs/common';
import { AppService } from './app.service';
import { DataService } from './services/data-service/index';
import { Greeting } from '../shared/types';

@Controller('comms')
export class AppController {
  constructor(private readonly appService: AppService, private readonly dataService: DataService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/your-next-delivery/:userId')
  getNextDelivery(@Param('userId') userId: string): Greeting | undefined {
    return this.dataService.getYourNextDeliveryMesgById(userId);
  }
}
