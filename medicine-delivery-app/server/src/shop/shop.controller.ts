import { CreateShopDto } from 'src/dto/shop.dto'
import { ShopService } from './shop.service'
import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common'

@Controller('shop')
export class ShopController {
	constructor(private shopService: ShopService) {}

	@Post()
	@UsePipes(new ValidationPipe())
	createShop(@Body() shopDto: CreateShopDto) {
		return this.shopService.createShop(shopDto)
	}
}
