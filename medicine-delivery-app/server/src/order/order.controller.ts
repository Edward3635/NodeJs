import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { OrderService } from './order.service'
import { CreateOrderDto } from './dto/CreateOrderDto.dto'
import { UserDataDto } from './dto/GetUserOrdersDto.dto'

@Controller('orders')
export class OrderController {
	constructor(private orderService: OrderService) {}

	@Get('/all')
	getAll() {
		return this.orderService.getAll()
	}

	@Get('/byShop/:id')
	getOrderByShopId(@Param('id') id: string) {
		return this.orderService.getOrderById(id)
	}

	@Get('/byUser')
	getOrdersByUser(@Query() dto: UserDataDto) {
		return this.orderService.getOrdersByUser(dto)
	}

	@Post('')
	createOrder(@Body() dto: CreateOrderDto) {
		return this.orderService.createOrder(dto)
	}
}
