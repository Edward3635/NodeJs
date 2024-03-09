import { CreateShopDto } from './../dto/shop.dto'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Shop, ShopDocument } from './shop.model'
import { Model } from 'mongoose'

@Injectable()
export class ShopService {
	constructor(@InjectModel(Shop.name) private shopModel: Model<ShopDocument>) {}
	async createShop(dto: CreateShopDto) {
		const newShop = new this.shopModel(dto)
		return newShop.save()
	}

	async getAllShops() {
		return this.shopModel.find().exec()
	}
}
