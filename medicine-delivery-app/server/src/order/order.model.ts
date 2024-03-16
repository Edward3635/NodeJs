import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type OrderDocument = HydratedDocument<Order>

interface IOrderData {
	id: string
	name: string
	price: number
	quantity: number
	shopId: string
	shopName: string
}

@Schema()
export class Order {
	@Prop({ required: true })
	name: string

	@Prop({ required: true })
	email: string

	@Prop({ required: true })
	phone: string

	@Prop({ required: true })
	address: string

	@Prop({ type: [{ type: Object, _id: false }] })
		order: IOrderData[]
}

export const OrderSchema = SchemaFactory.createForClass(Order)
