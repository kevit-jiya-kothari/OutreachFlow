import { IsEnum, IsMongoId } from 'class-validator';

export class AddWorkspaceMemberDto {
    @IsMongoId()
    userId:string;

    @IsEnum(['admin', 'member'])
    role: 'admin' | 'member' = 'member';
}