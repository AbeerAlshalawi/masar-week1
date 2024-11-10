import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DataSource } from 'typeorm/data-source/DataSource';
import { User } from './entities/user.entity';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly dataSource: DataSource,
  ) {}

  @Post('')
  async create(@Body() body) {
    const userRepo = this.dataSource.getRepository(User);
    const user = new User();
    const { fullName, age } = body;

    if (!fullName || !age) {
      throw new HttpException(
        'Full name and age are required',
        HttpStatus.BAD_REQUEST,
      );
    }

    user.fullName = fullName;
    user.age = age;

    await userRepo.save(user);

    return { message: 'User created successfully', user: user };
  }

  @Get('')
  async findAll() {
    const userRepo = this.dataSource.getRepository(User);
    const users = await userRepo.find();

    return { users: users };
  }
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const userRepo = this.dataSource.getRepository(User);
    const user = await userRepo.findOne({ where: { id: parseInt(id) } });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    await userRepo.remove(user);

    return { message: 'User deleted successfully' };
  }
}
