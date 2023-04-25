import { Controller, Body, Param, UseGuards } from '@nestjs/common'
import { Get, Headers, Post, Patch, Put, Delete, Query } from '@nestjs/common/decorators'
import { ParseIntPipe } from '@nestjs/common/pipes'
import { CreateLotDto, RespLotsDto, UpdateLotDto } from './fire_extinguisher.dto'
import { FireExtinguisherService } from './fire_extinguisher.service'
import { JwtAuthGuard } from 'src/auth/jwt-ath.guard'
import { FireExtinguisher } from './fire_extinguisher.entity'

@Controller('orders')
export class FireExtinguisherController {
    constructor(private fireExtinguisherService: FireExtinguisherService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAll(): Promise<RespLotsDto> {
        try {
            return await this.fireExtinguisherService.getAll()
        } catch (error) {
            return error
        }
    }

    @Post()
    async create(@Body() newLot: CreateLotDto): Promise<RespLotsDto> {
        try {
            return await this.fireExtinguisherService.create(newLot)
        } catch (error) {
            return error
        }
    }

    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number): Promise<FireExtinguisher> {
        try {
            return await this.fireExtinguisherService.getOne(id)
        } catch (error) {
            return error
        }
    }

    @Patch(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() lotToUpdate: UpdateLotDto
    ): Promise<RespLotsDto> {
        try {
            return await this.fireExtinguisherService.updateLot(lotToUpdate, id)
        } catch (error) {
            return error
        }
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number): Promise<RespLotsDto> {
        try {
            return await this.fireExtinguisherService.delete(id)
        } catch (err) {
            return err
        }
    }
}
