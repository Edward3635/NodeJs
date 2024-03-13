import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument } from 'mongoose'
import { Product } from 'src/product/product.model'

export type OrderDocument = HydratedDocument<Order>

interface IOrderData {
	id: string
	name: string
	price: number
	quantity: number
}

@Schema()
export class Order {
	@Prop({ required: false, unique: false })
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
