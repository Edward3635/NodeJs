import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ShopService } from './shop/shop.service'
import { ShopModule } from './shop/shop.module'

@Module({
	controllers: [],
	providers: [],
	imports: [
		MongooseModule.forRoot('mongodb+srv://qwerty:qwerty2024@cluster0.by79ysp.mongodb.net/?retryWrites=true&w=majority'),
		ShopModule
	]
})
export class AppModule {}
