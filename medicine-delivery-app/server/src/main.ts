import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import 'dotenv/config'
import { ValidationPipe } from '@nestjs/common'
async function start() {
	const PORT = process.env.PORT || 5000
	const app = await NestFactory.create(AppModule, { cors: true })
	app.useGlobalPipes(new ValidationPipe())
	await app.listen(PORT)
}
start()
