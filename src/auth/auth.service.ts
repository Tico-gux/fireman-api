import { Injectable } from '@nestjs/common'
import { UserService } from '../users/users.service'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
require('dotenv').config()

@Injectable()
export class AuthService {
    constructor(private usersService: UserService, private jwtService: JwtService) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOneByEmail(username)
        if (user && (await bcrypt.compare(pass, user.password))) {
            const { password, email, ...result } = user
            return result
        }

        return null
    }

    async login(user: any) {
        const payload = { id: user.id }
        return {
            access_token: this.jwtService.sign(payload, { secret: process.env.JWT_SECRET })
        }
    }
}
