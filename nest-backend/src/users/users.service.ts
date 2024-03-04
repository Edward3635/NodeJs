import { RolesService } from './../roles/roles.service'
import { Injectable } from '@nestjs/common'
import { User } from './users.model'
import { InjectModel } from '@nestjs/sequelize'
import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User) private userRepositoty: typeof User,
		private RolesService: RolesService
	) {}
	async createUser(dto: CreateUserDto) {
		const user = await this.userRepositoty.create(dto)
		const role = await this.RolesService.getRoleByValue('USER')
		await user.$set('roles', [role.id])
		user.roles = [role]
		return user
	}
	async getAllUsers() {
		return await this.userRepositoty.findAll({ include: { all: true } })
	}

	async getUserByEmail(email: string) {
		const user = await this.userRepositoty.findOne({ where: { email }, include: { all: true } })
		return user
	}
}
