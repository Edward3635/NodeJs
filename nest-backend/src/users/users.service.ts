import { RolesService } from './../roles/roles.service'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { User } from './users.model'
import { InjectModel } from '@nestjs/sequelize'
import { CreateUserDto } from './dto/create-user.dto'
import { AddRoleDto } from './dto/add-role.dto'
import { BanRoleDto } from './dto/ban-role.dto'

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
	async addRole(dto: AddRoleDto) {
		const user = await this.userRepositoty.findByPk(dto.userId)
		const role = await this.RolesService.getRoleByValue(dto.value)
		if (role && user) {
			await user.$add('role', role.id)
			return dto
		}
		throw new HttpException('Role or user were not found', HttpStatus.NOT_FOUND)
	}
	async ban(dto: BanRoleDto) {
		const user = await this.userRepositoty.findByPk(dto.userId)
		if (!user) {
			throw new HttpException('User was not found', HttpStatus.NOT_FOUND)
		}
		user.banned = true
		user.banReason = dto.banReason
		await user.save()
		return user
	}
}
