import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateOrderDto } from './dto/CreateOrderDto.tdo'
import { InjectModel } from '@nestjs/mongoose'
import { Order } from './order.model'
import mongoose, { Model } from 'mongoose'

@Injectable()
export class OrderService {
	constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}
	async createOrder(dto: CreateOrderDto) {
		const newOrder = new this.orderModel({ ...dto.userData, order: dto.order })
		return newOrder.save()
	}

	async getAll() {
		return this.orderModel.find({}).exec()
	}

	async getOrderById(id: string) {
		const isValidOrderId = mongoose.isValidObjectId(id)
		if (!isValidOrderId) {
			throw new HttpException('Invalid order id', HttpStatus.BAD_REQUEST)
		}

		const order = await this.orderModel.findById(id)

		if (!order) {
			throw new HttpException('Order was not found', HttpStatus.NOT_FOUND)
		}

		return order
	}
}
