import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument } from 'mongoose'

export type OrderDocument = HydratedDocument<Order>

interface IOrderData {
	product: mongoose.Schema.Types.ObjectId
	quantity: number
	shop: mongoose.Schema.Types.ObjectId
}

@Schema({ strict: 'throw' })
export class Order {
	@Prop({ required: true })
	name: string

	@Prop({ required: true })
	email: string

	@Prop({ required: true })
	phone: string

	@Prop({ required: true })
	address: string

	@Prop({ required: true })
	totalPrice: number

	@Prop({
		type: [
			{
				product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
				quantity: Number,
				shop: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop' },
				_id: false
			}
		],
		required: true
	})
	order: IOrderData[]
}

export const OrderSchema = SchemaFactory.createForClass(Order)
