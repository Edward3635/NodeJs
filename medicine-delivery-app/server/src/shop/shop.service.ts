import { CreateShopDto } from './../dto/shop.dto'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Shop } from './shop.model'
import { Model } from 'mongoose'

@Injectable()
export class ShopService {
	constructor(@InjectModel(Shop.name) private shopModel: Model<Shop>) {}
	createShop(createShopDto: CreateShopDto) {
		const newShop = new this.shopModel(CreateShopDto)
		return newShop.save()
	}
}
