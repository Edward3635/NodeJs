import { Module } from '@nestjs/common'
import { OrderController } from './order.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Order, OrderSchema } from './order.model'
import { OrderService } from './order.service'
import { Product, ProductsSchema } from 'src/product/product.model'
import { Shop, ShopsSchema } from 'src/shop/shop.model'

@Module({
	controllers: [OrderController],
	providers: [OrderService],
	imports: [
		MongooseModule.forFeature([
			{ name: Order.name, schema: OrderSchema },
			{ name: Product.name, schema: ProductsSchema },
			{ name: Shop.name, schema: ShopsSchema }
		])
	]
})
export class OrderModule {}
