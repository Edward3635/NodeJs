import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import 'dotenv/config'
async function start() {
	const PORT = process.env.PORT || 5000
	const app = await NestFactory.create(AppModule, { cors: true })
	await app.listen(PORT)
}
start()
