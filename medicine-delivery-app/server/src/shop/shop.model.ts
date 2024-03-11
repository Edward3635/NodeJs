import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument } from 'mongoose'
import { Product } from 'src/product/product.model'

export type ShopsDocument = HydratedDocument<Shop>

@Schema()
export class Shop {
	@Prop({ required: true, unique: true })
	name: string

	@Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] })
	products: Product[]
}

export const ShopsSchema = SchemaFactory.createForClass(Shop)
