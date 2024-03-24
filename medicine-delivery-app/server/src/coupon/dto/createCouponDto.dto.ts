import { IsNotEmpty, IsString } from 'class-validator'
export class CreateCouponDto {
	@IsNotEmpty()
	@IsString()
	readonly name: string

	@IsNotEmpty()
	@IsString()
	readonly code: string

	@IsNotEmpty()
	@IsString()
	readonly destination: string
}
