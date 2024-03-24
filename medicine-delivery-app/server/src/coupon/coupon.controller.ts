import { Body, Controller, Get, Post } from '@nestjs/common'
import { CouponService } from './coupon.service'
import { CreateCouponDto } from './dto/createCouponDto.dto'

@Controller('coupons')
export class CouponController {
	constructor(private couponService: CouponService) {}

	@Post('/create')
	createProduct(@Body() dto: CreateCouponDto) {
		return this.couponService.createCoupon(dto)
	}

	@Get('/all')
	getAll() {
		return this.couponService.getAll()
	}
}
