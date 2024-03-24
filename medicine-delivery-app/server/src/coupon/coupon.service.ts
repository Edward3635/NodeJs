import { CreateCouponDto } from './dto/createCouponDto.dto'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Coupon } from './coupon.model'
import { Model } from 'mongoose'

@Injectable()
export class CouponService {
	constructor(@InjectModel(Coupon.name) private couponModel: Model<Coupon>) {}

	async createCoupon(dto: CreateCouponDto) {
		const isExistCoupon = await this.couponModel.findOne({ code: dto.code })
		if (isExistCoupon) throw new HttpException('Promo code already exist', HttpStatus.BAD_REQUEST)
		const newCoupon = new this.couponModel(dto)
		return newCoupon.save()
	}

	async getAll() {
		return this.couponModel.find().exec()
	}
}
