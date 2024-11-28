import { Schema, model } from 'mongoose'
import { TCategory } from './category.interface'

const categorySchema = new Schema<TCategory>(
  {
    name: { type: String },
  },
  { timestamps: true },
)

const Category = model('Category', categorySchema)
export default Category
