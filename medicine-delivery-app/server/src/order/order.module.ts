import { Module } from '@nestjs/common'
import { OrderController } from './order.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Order, OrderSchema } from './order.model'
import { OrderService } from './order.service'

@Module({
	controllers: [OrderController],
	imports: [MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }])],
	providers:[OrderService]
})
export class OrderModule {}
