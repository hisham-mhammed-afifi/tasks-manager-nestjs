import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @ApiBody({
    schema: {
      example: {
        username: 'hesham',
        email: 'hesham@example.com',
        password: 'password123',
      },
    },
  })
  @ApiResponse({ status: 201, description: 'User registered successfully.' })
  async register(
    @Body('username') username: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<User> {
    return this.usersService.createUser(username, email, password);
  }

  @Get(':username')
  @ApiParam({
    name: 'username',
    required: true,
    description: 'The username of the user to retrieve.',
  })
  @ApiResponse({ status: 200, description: 'User retrieved successfully.' })
  async getUserByUsername(@Param('username') username: string): Promise<User> {
    return this.usersService.findUserByUsername(username);
  }
}
