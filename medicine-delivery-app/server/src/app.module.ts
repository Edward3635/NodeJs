import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ShopModule } from './shop/shop.module'
import { ProductModule } from './product/product.module'
import 'dotenv/config'

@Module({
	controllers: [],
	providers: [],
	imports: [MongooseModule.forRoot(process.env.DB_URL), ShopModule, ProductModule]
})
export class AppModule {}
