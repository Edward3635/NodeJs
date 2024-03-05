import { IsEmail, IsString, Length } from 'class-validator'

export class CreateUserDto {
	@IsString({ message: 'Should be string' })
	@IsEmail({},{ message: 'Incorrect email' })
	readonly email: string
	@IsString({ message: 'Should be string' })
	@Length(4, 16, { message: 'At least 4 symbols and no more than 16' })
	readonly password: string
}
