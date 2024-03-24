import { Module } from '@nestjs/common'
import { CouponService } from './coupon.service'
import { CouponController } from './coupon.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Coupon, CouponSchema } from './coupon.model'

@Module({
	providers: [CouponService],
	controllers: [CouponController],
	imports: [MongooseModule.forFeature([{ name: Coupon.name, schema: CouponSchema }])]
})
export class CouponModule {}
