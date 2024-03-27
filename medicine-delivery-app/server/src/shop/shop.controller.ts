import { CreateShopDto } from 'src/shop/dto/createShopDto.dto'
import { ShopService } from './shop.service'
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { IsString } from 'class-validator'

@Controller('shops')
export class ShopController {
	constructor(private shopService: ShopService) {}

	@Post()
	// @UsePipes(new ValidationPipe()) turned off bevause using global pipes
	createShop(@Body() shopDto: CreateShopDto) {
		return this.shopService.createShop(shopDto)
	}

	@Delete('/:id')
	removeShop(@Param('id') id: string) {
		return this.shopService.removeShop(id)
	}

	@Get('/all')
	getAll() {
		return this.shopService.getAllShops()
	}

	@Get('/:id')
	getProductByShopId(@Param('id') shopId: string) {
		return this.shopService.getProductsByShop(shopId)
	}
}
