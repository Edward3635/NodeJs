import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ShopModule } from './shop/shop.module'

@Module({
	controllers: [],
	providers: [],
	imports: [
		MongooseModule.forRoot(process.env.DB_URL),
		ShopModule
	]
})
export class AppModule {}
