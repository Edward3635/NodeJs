import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateOrderDto } from './dto/CreateOrderDto.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Order } from './order.model'
import mongoose, { Model } from 'mongoose'
import { Shop } from 'src/shop/shop.model'
import { Product } from 'src/product/product.model'
import { UserDataDto } from './dto/GetUserOrdersDto.dto'

@Injectable()
export class OrderService {
	constructor(
		@InjectModel(Order.name) private orderModel: Model<Order>,
		@InjectModel(Product.name) private productModel: Model<Product>,
		@InjectModel(Shop.name) private shopModel: Model<Shop>
	) {}

	async createOrder(dto: CreateOrderDto) {
		const isExistProducts = await Promise.all(
			dto.order.map(async order => {
				if (!mongoose.Types.ObjectId.isValid(order.product)) return null
				const existProduct = await this.productModel.exists({ _id: order.product })
				return existProduct
			})
		)
		if (isExistProducts.includes(null)) throw new HttpException('Wrong product id', HttpStatus.BAD_REQUEST)

		const isExistShops = await Promise.all(
			dto.order.map(async order => {
				if (!mongoose.Types.ObjectId.isValid(order.shop)) return null
				const existShop = await this.shopModel.exists({ _id: order.shop })
				return existShop
			})
		)

		if (isExistShops.includes(null)) throw new HttpException('Wrong shop id', HttpStatus.BAD_REQUEST)

		try {
			const newOrder = new this.orderModel({ ...dto.userData, order: dto.order })
			const savedOrder = await newOrder.save()
			return savedOrder
		} catch (error) {
			throw new HttpException('Failed to create order', HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	async getAll() {
		return this.orderModel.find({}).exec()
	}

	async getOrderById(id: string) {
		const isValidOrderId = mongoose.isValidObjectId(id)
		if (!isValidOrderId) throw new HttpException('Invalid order id', HttpStatus.BAD_REQUEST)

		const order = await this.orderModel
			.findById(id)
			.populate('order.product', 'name price')
			.populate('order.shop', 'name')

		if (!order) {
			throw new HttpException('Order was not found', HttpStatus.NOT_FOUND)
		}

		return order
	}

	async getOrdersByUser(dto: UserDataDto) {
		const orders = await this.orderModel
			.find(dto)
			.populate('order.product', 'name price')
			.populate('order.shop', 'name')

		if (!orders || orders.length === 0) {
			throw new HttpException('Orders were not found', HttpStatus.NOT_FOUND)
		}

		return orders
	}
}
