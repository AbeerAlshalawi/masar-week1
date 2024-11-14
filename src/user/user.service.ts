import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { fullName, age } = createUserDto;

    if (!fullName || !age) {
      throw new HttpException(
        'Full name and age are required',
        HttpStatus.BAD_REQUEST,
      );
    }


    
    try {
      const user = this.userRepository.create({ fullName, age });
      await this.userRepository.save(user);
      return { message: 'User created', user };

    } catch (error) {
      console.error('Error saving user:', error);
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
  
    }
    
   
  }

  async delete(id: number){
    const user = await this.userRepository.findOne({
      where: { id }, // Pass the id inside the 'where' object
    });

    // If the user is not found, throw a NotFoundException
    if (!user) {
      throw new HttpException(
        'User does not exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Delete the user from the database
    await this.userRepository.delete(id);
    return { message: 'User was deleted', user };
  }


  


  async findAll() {
    const users = await this.userRepository.find();
    return { users: users };
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }


  async update(id: number, updateUserDto: UpdateUserDto) {
    const existingUser = await this.userRepository.findOneBy({ id });

    if (!existingUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    // Only update fields that are provided in updateUserDto
    if (updateUserDto.fullName !== undefined) {
      existingUser.fullName = updateUserDto.fullName;
    }
    if (updateUserDto.age !== undefined) {
      existingUser.age = updateUserDto.age;
    }

    return this.userRepository.save(existingUser);
  }

