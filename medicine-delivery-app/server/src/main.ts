import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import 'dotenv/config'

async function start() {
	const app = await NestFactory.create(AppModule)
	const PORT = process.env.PORT || 5000
	await app.listen(PORT, () => console.log('port: ', process.env.PORT))
}
start()
