import { Body, Controller, Get, Post } from '@nestjs/common'
import { ProductService } from './product.service'
import { CreateProductDto } from 'src/dto/createProductDto.dto'

@Controller('products')
export class ProductController {
	constructor(private productService: ProductService) {}

	@Post()
	createProduct(@Body() productDto: CreateProductDto) {
		return this.productService.createProduct(productDto)
	}

	@Get()
	getAll() {
		return this.productService.getAllProducts()
	}

}
