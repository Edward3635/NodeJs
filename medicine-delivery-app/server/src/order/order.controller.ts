import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { OrderService } from './order.service'
import { CreateOrderDto } from './dto/CreateOrderDto.tdo'

@Controller('orders')
export class OrderController {
	constructor(private orderService: OrderService) {}

	@Get()
	getAll() {
		return this.orderService.getAll()
	}

	@Get('/:id')
	async getOrderByShopId(@Param('id') id: string) {
		return this.orderService.getOrderById(id)
	}

	@Post('')
	async createOrder(@Body() dto: CreateOrderDto) {
		return this.orderService.createOrder(dto)
	}
}
