import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/find-sum')
  getSum(@Query('num1') num1: number, @Query('num2') num2: number) {
    return this.appService.getSum(num1, num2);
  }

  @Get('/find-subtraction')
  getSubtraction(@Query('num1') num1: number, @Query('num2') num2: number) {
    return this.appService.getSubtraction(num1, num2);
  }

  @Get('/find-multiplication')
  getMultiplication(@Query('num1') num1: number, @Query('num2') num2: number) {
    return this.appService.getMultiplication(num1, num2);
  }
  @Get('/find-division')
getDivision(@Query('num1') num1: number, @Query('num2') num2: number) {
    if (num2 === 0) {
        return 'Error: Division by zero is not allowed';
    }
    return this.appService.getDivision(num1, num2);
}

}
