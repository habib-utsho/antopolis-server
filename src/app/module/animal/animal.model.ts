import { Schema, model, Types } from 'mongoose'
import { TAnimal } from './animal.interface'

const animalSchema = new Schema<TAnimal>(
  {
    name: { type: String },
    category: { type: Types.ObjectId, ref: 'Category' },
  },
  { timestamps: true },
)

const Category = model('Category', animalSchema)
export default Category
