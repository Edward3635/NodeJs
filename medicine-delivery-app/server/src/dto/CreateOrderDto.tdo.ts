import { Type } from 'class-transformer'
import { IsEmail, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator'

class userData {
	@IsNotEmpty()
	@IsString()
	name: string

	@IsNotEmpty()
	@IsEmail()
	email: string

	@IsNotEmpty()
	@IsNumber()
	phone: string

	@IsNotEmpty()
	@IsString()
	address: string
}

class order {
	@IsNotEmpty()
	@IsString()
	id: string

	@IsNotEmpty()
	@IsString()
	name: string

	@IsNotEmpty()
	@IsNumber()
	price: number

	@IsNotEmpty()
	@IsNumber()
	quantity: number
}

export class CreateOrderDto {
	@ValidateNested()
	@Type(() => userData)
	userData: userData

	@ValidateNested({ each: true })
	@Type(() => order)
	order: order[]
}
