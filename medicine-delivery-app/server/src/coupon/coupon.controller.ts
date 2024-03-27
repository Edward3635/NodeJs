import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
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

	@Get('/verify/:code')
	verifyCoupon(@Param('code') coupon: string) {
		return this.couponService.verifyCoupon(coupon)
	}
	@Delete('remove/all')
	removeAll() {
		return this.couponService.removeAll()
	}
	@Delete('remove/:code')
	removeCoupon(@Param('code') coupon: string) {
		return this.couponService.removeCoupon(coupon)
	}
}
