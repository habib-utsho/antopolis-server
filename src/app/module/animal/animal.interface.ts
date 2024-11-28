import { ObjectId } from "mongoose"

type TAnimal = {
  name: string
  category: ObjectId
}

export { TAnimal }
