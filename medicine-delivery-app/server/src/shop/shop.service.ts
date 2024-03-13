import { CreateShopDto } from '../dto/createShopDto.dto'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Shop } from './shop.model'
import { Model } from 'mongoose'
import { CreateOrderDto } from 'src/dto/CreateOrderDto.tdo'
import { Order } from './order.model'

@Injectable()
export class ShopService {
	constructor(
		@InjectModel(Shop.name) private shopModel: Model<Shop>,
		@InjectModel(Order.name) private orderModel: Model<Order>
	) {}

	async createShop(dto: CreateShopDto) {
		const newShop = new this.shopModel(dto)
		return newShop.save()
	}

	async removeShop(id: string) {
		return this.shopModel.findByIdAndDelete({ _id: id })
	}

	async getAllShops() {
		return this.shopModel.find({}, 'name _id')
	}
	async getProductsByShop(shopId: string) {
		const shop = await this.shopModel.findById(shopId).populate('products')
		return shop.products
	}

	async createOrder(dto: CreateOrderDto) {
		const newOrder = new this.orderModel({ ...dto.userData, order: dto.order })
		return newOrder.save()
	}
}
