import { RespDto } from 'src/app.dto'
import { User } from './users.entity'

export class CreateUserDto {
	email:string
	password:string
}

export class UpdateUserDto {
	email?:string
	password?:string
}

interface IToken {
	token:string
	}

export class RespUsersDto extends RespDto {
data: IToken
}
