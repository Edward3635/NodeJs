import { Type } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator'

class UserData {
	@IsNotEmpty()
	@IsString()
	name: string
	@IsNotEmpty()
	@IsString()
	email: string
	@IsNotEmpty()
	@IsString()
	phone: string
	@IsNotEmpty()
	@IsString()
	address: string
}

class Order {
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
	@IsNotEmpty()
	@IsString()
	shopId: string
	@IsNotEmpty()
	@IsString()
	shopName: string
}

export class CreateOrderDto {
	@ValidateNested()
	@Type(() => UserData)
	userData: UserData

	@ValidateNested({ each: true })
	@Type(() => Order)
	order: Order[]
}
