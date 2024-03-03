import { Injectable } from '@nestjs/common'
import { User } from './users.model'
import { InjectModel } from '@nestjs/sequelize'
import { CreateeUserDto } from './dto/create-user.dto'

@Injectable()
export class UsersService {
	constructor(@InjectModel(User) private userRepositoty: typeof User) {}
	async createUser(dto: CreateeUserDto) {
		const user = await this.userRepositoty.create(dto)
		return user
	}
	async getAllUsers() {
		const users = await this.userRepositoty.findAll();
		return users;
	}
}
