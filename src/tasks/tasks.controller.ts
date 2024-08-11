import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { User } from 'src/users/entities/user.entity';
import { Task } from './entities/task.entity';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Tasks')
@ApiBearerAuth()
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiBody({
    schema: {
      example: {
        title: 'Complete API',
        description: 'Finish implementing the API endpoints.',
        user: '<USER_ID>',
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Task created successfully.' })
  async createTask(
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('user') user: User,
  ): Promise<Task> {
    return this.tasksService.createTask(title, description, user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('user/:userId')
  @ApiParam({
    name: 'userId',
    required: true,
    description: 'The ID of the user whose tasks to retrieve.',
  })
  @ApiResponse({ status: 200, description: 'Tasks retrieved successfully.' })
  async getTasksByUser(@Param('userId') userId: string): Promise<Task[]> {
    return this.tasksService.findTasksByUser(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The ID of the task to update.',
  })
  @ApiBody({ schema: { example: { completed: true } } })
  @ApiResponse({ status: 200, description: 'Task updated successfully.' })
  async updateTask(
    @Param('id') id: string,
    @Body('completed') completed: boolean,
  ): Promise<Task> {
    return this.tasksService.updateTask(id, completed);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The ID of the task to delete.',
  })
  @ApiResponse({ status: 200, description: 'Task deleted successfully.' })
  async deleteTask(@Param('id') id: string): Promise<void> {
    return this.tasksService.deleteTask(id);
  }
}
