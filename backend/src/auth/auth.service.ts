import { Injectable, ConflictException, UnauthorizedException  } from '@nestjs/common';
import { UsersService } from '../users/users.service.js';
import { RegisterDto } from './dto/register.dto.js';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto.js';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ){}

    async register(registerDto: RegisterDto) {
        const { name, email, password } = registerDto;

        // Check whether the email already exists
        const existingUser = await this.usersService.findByEmail(email);

        if (existingUser) {
        throw new ConflictException('Email already registered');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user in MongoDB
        const user = await this.usersService.createUser({
        name,
        email,
        password: hashedPassword,
        });

        // Never return the password
        const { password: _, ...result } = user.toObject();

        return {
        message: 'User registered successfully',
        user: result,
        };
    }

    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;

        // Find user with password hash
        const user = await this.usersService.findByEmailWithPassword(email);

        if (!user) {
            throw new UnauthorizedException('Invalid email or password');
        }

        // Compare entered password with stored hash
        const isPasswordValid = await bcrypt.compare(
            password,
            user.password,
        );

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid email or password');
        }

        // Generate JWT
        const payload = {
            sub: user._id.toString(),
            email: user.email,
        };

        const accessToken = await this.jwtService.signAsync(payload);

        return {
            message: 'Login successful',
            access_token: accessToken,
        };
    }
}

