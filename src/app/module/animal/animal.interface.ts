import { ObjectId } from "mongoose"

type TAnimal = {
  name: string
  img: string
  category: ObjectId
}

export { TAnimal }
