import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator'

export class UserDataDto {
	@IsNotEmpty()
	@IsString()
	@IsEmail()
	email: string
	@IsNotEmpty()
	@IsPhoneNumber('UA', {
		message: 'Invalid Ukrainian phone number, example:0995654336'
	})
	phone: string
}
