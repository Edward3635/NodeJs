import { Module } from '@nestjs/common'
import { ShopController } from './shop.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Shop, ShopsSchema } from './shop.model'
import { ShopService } from './shop.service'

@Module({
	controllers: [ShopController],
	imports: [MongooseModule.forFeature([{ name: Shop.name, schema: ShopsSchema }])],
	providers: [ShopService]
})
export class ShopModule {}
