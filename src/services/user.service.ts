import { User } from "../models/User";
import { IUser } from "../interfaces/User";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class UserService {

    public async getAllUsers() {
        const users = await User.find();
        return { statusCode: 200, users };
    }

    public async createUser(user: IUser) {
        const isUser = await User.findOne({ email: user.email });

        if (isUser) {
            return { statusCode: 400, message: 'User with same email already exists!' }
        }

        const pUser = await User.findOne({ phone: user.phone });
        if (pUser) {
            return { statusCode: 400, message: 'User with same Phone Number already exists!' }
        }

        const newUser = await User.create(user);
        return { statusCode: 200, message: 'User created successfully!', newUser };
    }

    public async loginUser(user: IUser) {
        const isUser = await User.findOne({ email: user.email });

        if (!isUser) {
            return { statusCode: 400, message: 'User not found!' };
        }

        if (user.password != isUser.password) {
            return { statusCode: 400, message: 'Password is not valid!' };
        }

        const token = jwt.sign({ userId: isUser._id, role: isUser.role }, '1gdbuyf%^%^#FDTAFFFFFF3sufgbuyf', { expiresIn: '10h' });
        return { statusCode: 200, message: 'User login successfull!', isUser, token };
    }

    public async updateUser(userId: string, user: IUser) {
        const isUser = await User.findById(userId);

        if (!isUser) {
            return { statusCode: 400, message: 'User not found!' };
        }

        const updatedUser = await User.findByIdAndUpdate(userId, user, { new: true });
        return { statusCode: 200, messaage: 'User updated successfully!', updatedUser };
    }

    public async deleteUser(userId: string) {
        const isUser = await User.findById(userId);

        if (!isUser) {
            return { statusCode: 400, message: 'User not found!' };
        }

        const deletedUser = await User.findByIdAndDelete(userId);
        return { statusCode: 200, messaage: 'User deleted successfully!', deletedUser };
    }
}