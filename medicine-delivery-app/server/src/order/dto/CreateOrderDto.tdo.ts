import { Type } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsPhoneNumber, IsString, ValidateNested } from 'class-validator'

class UserData {
	@IsNotEmpty()
	@IsString()
	name: string
	@IsNotEmpty()
	@IsString()
	email: string
	@IsNotEmpty()
	@IsString()
	@IsPhoneNumber()
	phone: string
	@IsNotEmpty()
	@IsString()
	address: string
}

class Order {
	@IsNotEmpty()
	@IsString()
	product: string
	@IsNotEmpty()
	@IsNumber()
	quantity: number
	@IsNotEmpty()
	@IsString()
	shop: string
}

export class CreateOrderDto {
	@ValidateNested()
	@Type(() => UserData)
	userData: UserData

	@ValidateNested({ each: true })
	@Type(() => Order)
	order: Order[]
}
