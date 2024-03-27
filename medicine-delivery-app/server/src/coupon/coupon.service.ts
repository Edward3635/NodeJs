import { verifyCoupon } from './../../../client/src/redux/shoppingSlice'
import { CreateCouponDto } from './dto/createCouponDto.dto'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Coupon } from './coupon.model'
import mongoose, { Model } from 'mongoose'

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

	async verifyCoupon(coupon: string) {
		const isExistCoupon = await this.couponModel.findOne({ code: coupon }).select('name destination -_id')
		if (!isExistCoupon) throw new HttpException(`The coupon doesn't exist or is no longer valid`, HttpStatus.NOT_FOUND)
		return isExistCoupon
	}

	async removeCoupon(code: string) {
		const removedCoupon = await this.couponModel.findOneAndDelete({ code })
		if (!removedCoupon) throw new HttpException(`The coupon doesn't exist`, HttpStatus.NOT_FOUND)
		return removedCoupon
	}

	async removeAll() {
		return this.couponModel.deleteMany({})
	}
}
