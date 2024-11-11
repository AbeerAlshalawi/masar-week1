import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getSum(num1: number, num2: number) {
    return Number(num1) + Number(num2);
  }

  getSubtraction(num1: number, num2: number) {
    return num1 - num2;
  }

  
  getMultiplication(num1: number, num2: number) {
    return num1 * num2;
  }
  getDivision(num1: number, num2: number): number {
    return num1 / num2;
}

}
