import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type ProductsDocument = HydratedDocument<Product>

@Schema({ strict: 'throw' })
export class Product {
	@Prop()
	name: string

	@Prop()
	price: number

	// @Prop({ type: 'ObjectId', ref: 'Shop' })
	// shop_id: string
}

export const ProductsSchema = SchemaFactory.createForClass(Product)
