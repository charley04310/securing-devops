import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { HelloDto } from './dto/hello.dto';
import { HelloEntity } from './app.entity';

@Controller('hello')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  postHello(
    @Body()
    message: HelloDto,
  ): Promise<HelloEntity> {
    return this.appService.postHello(message);
  }
}
