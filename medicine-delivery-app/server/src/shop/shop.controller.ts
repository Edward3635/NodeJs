import { CreateShopDto } from 'src/dto/shop.dto'
import { ShopService } from './shop.service'
import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common'

@Controller('shops')
export class ShopController {
	constructor(private shopService: ShopService) {}

	@Post()
	@UsePipes(new ValidationPipe())
	createShop(@Body() shopDto: CreateShopDto) {
		return this.shopService.createShop(shopDto)
	}

	@Get()
	getAll() {
		return this.shopService.getAllShops()
	}
}
