import { Module } from '@nestjs/common'
import { ShopController } from './shop.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Shop, ShopSchema } from './shop.model'
import { ShopService } from './shop.service'

@Module({
	controllers: [ShopController],
	imports: [MongooseModule.forFeature([{ name: Shop.name, schema: ShopSchema }])],
	providers: [ShopService]
})
export class ShopModule {}
