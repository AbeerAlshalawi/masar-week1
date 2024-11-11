import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Post('/createuser')
  async create(@Body() createUserDto: CreateUserDto) {
   
   //return createUserDto;
  return this.userService.create(createUserDto);
  }


  
  @Post('/deleteuser')
  async delete(@Body() body: { id: number }) {
    const { id } = body;  // Extract the 'id' from the body
    await this.userService.delete(id);  // Call the service to delete the user
    return { message: `User with ID ${id} deleted successfully` };


  }

  @Get('')
  async findAll() {
    return this.userService.findAll();

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
