import { IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { RespDto } from 'src/app.dto'
import { FireExtinguisher } from './fire_extinguisher.entity'

export class CreateLotDto {
    @IsNotEmpty()
    @IsString()
    url: string

    @IsNotEmpty()
    @IsString()
    name: string

    @IsOptional()
    @IsString()
    exporter: string

    @IsOptional()
    @IsString()
    importer: string

    @IsOptional()
    @IsString()
    beekeper: string

    @IsOptional()
    @IsString()
    origin: string

    @IsOptional()
    @IsString()
    flowerSource: string

    @IsOptional()
    @IsString()
    hives: string
}

export class UpdateLotDto {
    url?: string
    name?: string
    exporter?: string
    importer?: string
    beekeper?: string
    origin?: string
    flowerSource?: string
    hives?: string
}

export class RespLotsDto extends RespDto {
    data: FireExtinguisher | FireExtinguisher[] | Boolean
}
