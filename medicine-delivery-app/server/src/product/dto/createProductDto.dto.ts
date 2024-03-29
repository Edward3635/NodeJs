import { IsNotEmpty, IsNumber, IsString } from 'class-validator'
export class CreateProductDto {
	@IsNotEmpty()
	@IsString()
	readonly name: string
	@IsNotEmpty()
	@IsNumber()
	readonly price: number
	@IsNotEmpty()
	@IsString()
	readonly shopId: string
}
