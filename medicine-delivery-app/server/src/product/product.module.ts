import { Module } from '@nestjs/common'
import { ProductController } from './product.controller'
import { ProductService } from './product.service'
import { MongooseModule } from '@nestjs/mongoose'
import { Product, ProductsSchema } from './product.model'
import { Shop, ShopsSchema } from 'src/shop/shop.model'

@Module({
	controllers: [ProductController],
	providers: [ProductService],
	imports: [
		MongooseModule.forFeature([
			{ name: Product.name, schema: ProductsSchema },
			{ name: Shop.name, schema: ShopsSchema }
		])
	]
})
export class ProductModule {}
