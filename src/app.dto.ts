import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class RespDto {
    @IsOptional()
    @IsString()
    message?: string

    @IsOptional()
    data?: any

    @IsOptional()
    code?:{status:number,
    message:string
    }
}
