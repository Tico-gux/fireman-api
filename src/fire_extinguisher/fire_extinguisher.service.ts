import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm/repository/Repository'
import { InjectRepository } from '@nestjs/typeorm'
import { FireExtinguisher } from './fire_extinguisher.entity'
import { CreateLotDto, RespLotsDto, UpdateLotDto } from './fire_extinguisher.dto'
import { HttpException } from '@nestjs/common/exceptions'
import { HttpStatus } from '@nestjs/common/enums'
import { Not } from 'typeorm'

@Injectable()
export class FireExtinguisherService {
    constructor(
        @InjectRepository(FireExtinguisher)
        private fireExtinguisherRepository: Repository<FireExtinguisher>
    ) {}

    async getAll(): Promise<RespLotsDto> {
        return new Promise<RespLotsDto>(async (resolve, reject) => {
            try {
                const lots = await this.fireExtinguisherRepository.find()
                if (!lots.length) {
                    const error = {
                        code: new HttpException(
                            'LOTS.GET_ALL.ERROR.NOT_FOUND',
                            HttpStatus.NOT_FOUND
                        ),
                        err: 'Not found'
                    }
                    reject(error)
                }
                resolve({
                    message: 'LOTS.GET_ALL.SUCCESS',
                    data: lots
                })
            } catch (err) {
                const error = {
                    code: new HttpException(
                        'LOTS.GET_ALL.ERROR.SERVER_ERROR',
                        HttpStatus.INTERNAL_SERVER_ERROR
                    ),
                    err
                }
                reject(error)
            }
        })
    }

    async getOne(id: number): Promise<FireExtinguisher> {
        return new Promise<FireExtinguisher>(async (resolve, reject) => {
            try {
                const resp = await this.fireExtinguisherRepository.findOneBy({ id })
                if (!resp) {
                    const error = {
                        code: new HttpException(
                            'LOT.GET_ONE.ERROR.NOT_FOUND',
                            HttpStatus.NOT_FOUND
                        ),
                        err: 'Not found'
                    } //new HttpException("Lot does existn't", HttpStatus.CONFLICT)
                    reject(error)
                }
                resolve(resp)
            } catch (err) {
                const error = {
                    code: new HttpException(
                        'LOTS.UPDATE.ERROR.BAD_REQUEST',
                        HttpStatus.BAD_REQUEST
                    ),
                    err
                }
                reject(error)
            }
        })
    }

    async validateName(name: string, id?: number): Promise<Boolean> {
        return new Promise<Boolean>(async (resolve, reject) => {
            try {
                const whereClause = id ? { id: Not(id), name } : { name }
                const exists = await this.fireExtinguisherRepository.exist({ where: whereClause })
                if (exists) {
                    const error = {
                        code: new HttpException(
                            'LOTS.VALIDATE_NAME.ERROR.ALREADY_EXISTS',
                            HttpStatus.BAD_REQUEST
                        ),
                        error: 'ALREADY_EXISTS'
                    }
                    reject(error)
                }
                resolve(exists)
            } catch (err) {
                const error = {
                    code: new HttpException(
                        'LOTS.VALIDATE_URL.ERROR.BAD_REQUEST',
                        HttpStatus.BAD_REQUEST
                    ),
                    err
                }
            }
        })
    }

    async create(newLot: CreateLotDto): Promise<RespLotsDto> {
        return new Promise<RespLotsDto>(async (resolve, reject) => {
            try {
                try {
                    const newLotCreated = new FireExtinguisher()
                    Object.assign(newLotCreated, newLot)
                    resolve({
                        data: await this.fireExtinguisherRepository.save(newLotCreated),
                        code: {
                            status: HttpStatus.OK,
                            message: 'Lot created successfully'
                        }
                    })
                } catch (err) {
                    const error = {
                        code: new HttpException(
                            'LOT.CREATE.ERROR.BAD_REQUEST',
                            HttpStatus.BAD_REQUEST
                        ),
                        err
                    }
                    reject(error)
                }
            } catch (error) {
                reject(error)
            }
        })
    }

    async updateLot(lotToUpdate: UpdateLotDto, id: number): Promise<RespLotsDto> {
        return new Promise<RespLotsDto>(async (resolve, reject) => {
            try {
                const lotFound = await this.getOne(id)
                if (!lotFound) {
                    const error = {
                        code: new HttpException(
                            'LOTS.UPDATE.ERROR.BAD_REQUEST.ID_NOT_FOUND',
                            HttpStatus.BAD_REQUEST
                        )
                    }
                    reject(error)
                }
                Object.assign(lotFound, lotToUpdate)
                const resp = await this.fireExtinguisherRepository.save(lotFound)
                resolve({
                    data: resp,
                    code: {
                        status: HttpStatus.OK,
                        message: 'Lot updated successfully'
                    }
                })
                let errorName = ''

                const error = {
                    code: new HttpException(
                        `LOTS.UPDATE.ERROR.${errorName}`,
                        HttpStatus.BAD_REQUEST
                    )
                }
                reject(error)
            } catch (err) {
                const error = {
                    code: new HttpException(
                        'LOTS.UPDATE.ERROR.BAD_REQUEST',
                        HttpStatus.BAD_REQUEST
                    ),
                    err
                }
                reject(error)
            }
        })
    }

    async delete(id: number): Promise<RespLotsDto> {
        return new Promise<RespLotsDto>(async (resolve, reject) => {
            try {
                const lotFound = await this.fireExtinguisherRepository.exist({ where: { id } })
                if (!lotFound) {
                    const error = {
                        code: new HttpException('LOTS.UPDATE.ERROR.NOT_FOUND', HttpStatus.NOT_FOUND)
                    }
                    reject(error)
                }

                const resp = await this.fireExtinguisherRepository.softDelete(id)
                resolve({
                    message: 'LOTS.UPDATE.SUCCES',
                    data: true
                })
            } catch (err) {
                const error = {
                    code: new HttpException(
                        'LOTS.UPDATE.ERROR.BAD_REQUEST',
                        HttpStatus.BAD_REQUEST
                    ),
                    err
                }
                reject(error)
            }
        })
    }
}
