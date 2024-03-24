import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema({ strict: 'throw' })
export class Coupon {
	@Prop({ required: true })
	name: string

	@Prop({ required: true, unique: true })
	code: string

	@Prop({ required: true })
	destination: string
}

export const CouponSchema = SchemaFactory.createForClass(Coupon)
