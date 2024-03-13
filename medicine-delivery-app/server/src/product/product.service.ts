import { HttpException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Product } from './product.model'
import { Model } from 'mongoose'
import { CreateProductDto } from 'src/dto/createProductDto.dto'
import { Shop } from 'src/shop/shop.model'

@Injectable()
export class ProductService {
	constructor(
		@InjectModel(Product.name) private productModel: Model<Product>,
		@InjectModel(Shop.name) private shopModel: Model<Shop>
	) {}

	async createProduct({ shopId, ...dto }: CreateProductDto) {
		const findShop = await this.shopModel.findById(shopId)

		if (!findShop) throw new HttpException('Shop not found', 404)
		const newProduct = new this.productModel(dto)
		const savedProduct = await newProduct.save()
		await findShop.updateOne({ $push: { products: savedProduct._id } })
		return savedProduct
	}

	async getAllProducts() {
		return this.productModel.find()
	}

}
