import { Schema, model, Types } from 'mongoose'
import { TAnimal } from './animal.interface'

const animalSchema = new Schema<TAnimal>(
  {
    name: { type: String, required: true },
    img: { type: String },
    category: { type: Types.ObjectId, ref: 'Category', required: true },
  },
  { timestamps: true },
)

const Animal = model('Animal', animalSchema)
export default Animal
