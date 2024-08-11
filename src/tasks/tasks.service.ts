import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from './entities/task.entity';
import { Model } from 'mongoose';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async createTask(
    title: string,
    description: string,
    user: User,
  ): Promise<Task> {
    const newTask = new this.taskModel({ title, description, user });
    return newTask.save();
  }

  async findTasksByUser(userId: string): Promise<Task[]> {
    return this.taskModel.find({ user: userId });
  }

  async updateTask(id: string, completed: boolean): Promise<Task> {
    const task = await this.taskModel.findById(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    task.completed = completed;
    return task.save();
  }

  async deleteTask(id: string): Promise<void> {
    const task = await this.taskModel.findById(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    await this.taskModel.deleteOne({ _id: id });
  }
}
