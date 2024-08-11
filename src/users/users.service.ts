import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(
    username: string,
    email: string,
    password: string,
  ): Promise<User> {
    const newUser = new this.userModel({ username, email, password });
    return newUser.save();
  }

  async findUserByUsername(username: string): Promise<User> {
    return this.userModel.findOne({ username });
  }

  async findUserById(id: string): Promise<User> {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
