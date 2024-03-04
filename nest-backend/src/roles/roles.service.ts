import { Injectable } from '@nestjs/common'
import { CreateRoleDto } from './dto/create-role.dto'
import { InjectModel } from '@nestjs/sequelize'
import { Role } from './roles.model'
import { UpdateRoleDto } from './dto/update-role.dto'

@Injectable()
export class RolesService {
	constructor(@InjectModel(Role) private roleRepository: typeof Role) {}
	async createRole(dto: CreateRoleDto) {
		const role = await this.roleRepository.create(dto)
		return role
	}
	async getRoleByValue(value: string) {
		const role = await this.roleRepository.findOne({ where: { value } })
		return role
	}

	async changeRoleEntity(dto: UpdateRoleDto) {
		await this.roleRepository.update(dto, { where: { id: dto.id } })
		return await this.roleRepository.findOne({ where: { id: dto.id } })
	}

	async getAllRoles() {
		return await this.roleRepository.findAll()
	}
}
