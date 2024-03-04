import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'
import { RolesService } from './roles.service'
import { Body, Controller, Get, Param, Post } from '@nestjs/common'

@Controller('roles')
export class RolesController {
	constructor(private roleService: RolesService) {}

	@Get('/:value')
	getByValue(@Param('value') value: string) {
		return this.roleService.getRoleByValue(value)
	}

	@Get('')
	getAll() {
		return this.roleService.getAllRoles()
	}

	@Post()
	create(@Body() dto: CreateRoleDto) {
		return this.roleService.createRole(dto)
	}

	@Post('/updateRole')
	updateRoleEntity(@Body() dto: UpdateRoleDto) {
		return this.roleService.changeRoleEntity(dto)
	}
}
