import { Order } from 'src/orders/orders.entity'
import { Controller, Body, Param, UseGuards } from '@nestjs/common'
import { Get, Headers, Post, Patch, Put, Delete, Query } from '@nestjs/common/decorators'
import { ParseIntPipe } from '@nestjs/common/pipes'
import { CreateLotDto, RespLotsDto, UpdateLotDto } from './orders.dto'
import { OrderService } from './orders.service'
import { JwtAuthGuard } from 'src/auth/jwt-ath.guard'

@Controller('orders')
export class OrderController {
    constructor(private orderService: OrderService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAll(): Promise<RespLotsDto> {
        try {
            return await this.orderService.getAll()
        } catch (error) {
            return error
        }
    }

    @Post()
    async create(@Body() newLot: CreateLotDto): Promise<RespLotsDto> {
        try {
            return await this.orderService.create(newLot)
        } catch (error) {
            return error
        }
    }

    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number): Promise<Order> {
        try {
            return await this.orderService.getOne(id)
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
            return await this.orderService.updateLot(lotToUpdate, id)
        } catch (error) {
            return error
        }
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number): Promise<RespLotsDto> {
        try {
            return await this.orderService.delete(id)
        } catch (err) {
            return err
        }
    }
}
