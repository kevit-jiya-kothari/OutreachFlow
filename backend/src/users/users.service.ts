import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema.js';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>,
    ) {}

    async createUser(userData: Partial<User>) {
        const user = new this.userModel(userData);
        return user.save();
    }

    async findByEmail(email: string) {
        return this.userModel.findOne({ email }).exec();
    }

    async findByEmailWithPassword(email: string) {
        return this.userModel
        .findOne({ email })
        .select('+password')
        .exec();
    }

    async findById(id: string) {
        return this.userModel.findById(id).exec();
    }
}
