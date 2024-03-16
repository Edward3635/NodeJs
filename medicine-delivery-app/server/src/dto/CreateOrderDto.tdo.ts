import { Type } from 'class-transformer'
import { ValidateNested } from 'class-validator'

class UserData {
	name: string
	email: string
	phone: string
	address: string
}

class Order {
	id: string
	name: string
	price: number
	quantity: number
}

export class CreateOrderDto {
	@ValidateNested()
	@Type(() => UserData)
	userData: UserData

	@ValidateNested({ each: true })
	@Type(() => Order)
	order: Order[]
}
