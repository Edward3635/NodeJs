import { IsNotEmpty, IsString } from 'class-validator'
export class CreateShopDto {
	@IsNotEmpty()
	@IsString()
	readonly name: string
}
