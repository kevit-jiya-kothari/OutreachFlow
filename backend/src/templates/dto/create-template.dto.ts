import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUrl, ValidateIf } from 'class-validator';

export class CreateTemplateDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEnum(['text', 'image'])
    type: 'text' | 'image';

    @IsString()
    @IsNotEmpty()
    content: string;

    @ValidateIf((dto: CreateTemplateDto) => dto.type === 'image')
    @IsString()
    @IsNotEmpty()
    @IsUrl()
    imageUrl?: string;
}