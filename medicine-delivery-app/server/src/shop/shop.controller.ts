import { CreateShopDto } from 'src/dto/createShopDto.dto'
import { ShopService } from './shop.service'
import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common'

@Controller('shops')
export class ShopController {
	constructor(private shopService: ShopService) {}

	@Post()
	@UsePipes(new ValidationPipe())
	createShop(@Body() shopDto: CreateShopDto) {
		return this.shopService.createShop(shopDto)
	}

	@Post('/remove')
	removeShop(@Body() {id}:{id:string}) {
		return this.shopService.removeShop(id)
	}

	@Get()
	getAll() {
		return this.shopService.getAllShops()
	}

	
	@Get('/:id')
  async getProductsByShopId(@Param('id') shopId: string) {
    return this.shopService.getProductsByShop(shopId);
  }
}
