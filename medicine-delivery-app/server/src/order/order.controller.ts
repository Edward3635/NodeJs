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
	async getOrderByShopId(@Param('id') id: string) {
		return this.orderService.getOrderById(id)
	}

	@Get('/byUser')
	async getOrdersByUser(@Query() dto: UserDataDto) {
		console.log(dto)

		return this.orderService.getOrdersByUser(dto)
	}

	@Post('')
	async createOrder(@Body() dto: CreateOrderDto) {
		return this.orderService.createOrder(dto)
	}
}
