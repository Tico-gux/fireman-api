import { User } from './users.entity'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm/repository/Repository'
import { InjectRepository } from '@nestjs/typeorm'
import * as bcrypt from 'bcrypt'
import { CreateUserDto, UpdateUserDto } from './users.dto'
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) {}

    findAll(): Promise<User[]> {
        return this.usersRepository.find()
    }

    findOne(id: number): Promise<User> {
        return this.usersRepository.findOneBy({ id }) //TODO buscar uno
    }

    async findOneByEmail(username: string): Promise<User> {
        const userFound = await this.usersRepository.findOneBy({ email: username }) //TODO Error handler
        return userFound
    }

    async delete(id: number) {
        const userFound = await this.findOne(id)
        if (userFound) {
            return this.usersRepository.softDelete(id)
        } // TODO ERROR TREATMENT
        return null
    }

    async create(user: CreateUserDto): Promise<User> {
        return new Promise<User>(async (resolve, reject) => {
            try {
                const userFound = await this.usersRepository.findOne({
                    where: {
                        email: user.email
                    }
                })

                if (userFound) {
                    const error = {
                        code: new HttpException(
                            'USER_CREATE.REPEATED_EMAIL',
                            HttpStatus.BAD_REQUEST
                        )
                    }
                    reject(error)
                }
                const saltRounds = 10
                const salt = bcrypt.genSaltSync(saltRounds)
                const hashedPassword = await bcrypt.hash(user.password, salt)

                const newUser = new User()
                newUser.email = user.email
                newUser.password = hashedPassword
                const result = await this.usersRepository.save(newUser)
                resolve(result)
            } catch (error) {}
        })
    }

    async update(user: UpdateUserDto, id: number) {
        const userFound = await this.findOne(id)
        if (userFound) {
            Object.assign(userFound, user)
            return this.usersRepository.save(userFound)
        } //TODO ERROR TREATMENT
        return null
    }
}
