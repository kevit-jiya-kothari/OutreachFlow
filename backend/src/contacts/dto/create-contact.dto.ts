import { IsArray, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

export class CreateContactDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @Matches(/^\+?[0-9]{7,15}$/)
    phone: string;

    @IsOptional()
    @IsArray()
    @IsEnum(['lead', 'premium', 'VIP'], { each: true })
    tags?: ('lead' | 'premium' | 'VIP')[];
}