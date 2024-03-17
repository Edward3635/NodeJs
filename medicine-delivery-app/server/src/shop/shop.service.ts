import { CreateShopDto } from './dto/createShopDto.dto'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Shop } from './shop.model'
import mongoose, { Model } from 'mongoose'

@Injectable()
export class ShopService {
	constructor(@InjectModel(Shop.name) private shopModel: Model<Shop>) {}

	async createShop(dto: CreateShopDto) {
		const newShop = new this.shopModel(dto)//!! validate
		return newShop.save()
	}

	async removeShop(id: string) {
		const isValidShopId = mongoose.isValidObjectId(id)
		if (!isValidShopId) throw new HttpException('Invalid shopId', HttpStatus.BAD_REQUEST)
		return this.shopModel.findByIdAndDelete({ _id: id })
	}

	async getAllShops() {
		return this.shopModel.find({}, 'name _id')
	}
	async getProductsByShop(shopId: string) {
		const isValidObjectId = mongoose.isValidObjectId(shopId)
		if (!isValidObjectId) throw new HttpException('Invalid shopId', HttpStatus.BAD_REQUEST)
		const shop = await this.shopModel.findById(shopId).populate('products')
		if (!shop) {
			throw new HttpException('Shop was not found', HttpStatus.NOT_FOUND)
		}
		return shop.products
	}
}
