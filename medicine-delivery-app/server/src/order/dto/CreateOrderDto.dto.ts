import { Type } from 'class-transformer'
import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsPhoneNumber, IsString, ValidateNested } from 'class-validator'

class UserData {
	@IsNotEmpty()
	@IsString()
	name: string
	@IsNotEmpty()
	@IsString()
	email: string
	@IsNotEmpty()
	@IsString()
	@IsPhoneNumber('UA', {
		message: 'Invalid Ukrainian phone number, example:0995654336'
	})
	phone: string
	@IsNotEmpty()
	@IsString()
	address: string
	@IsString()
	coupon: string
	@IsNotEmpty()
	@IsNumber()
	totalPrice: number

	@IsNumber()
	totalDiscountPrice: number
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
	@IsArray()
	@ArrayMinSize(1)
	@Type(() => Order)
	order: Order[]
}
