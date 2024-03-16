import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ShopModule } from './shop/shop.module'
import { ProductModule } from './product/product.module'
import { OrderService } from './order/order.service';
import { OrderModule } from './order/order.module';
import 'dotenv/config'

@Module({
	controllers: [],
	providers: [],
	imports: [MongooseModule.forRoot(process.env.DB_URL), ShopModule, ProductModule, OrderModule]
})
export class AppModule {}
