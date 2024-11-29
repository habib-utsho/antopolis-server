import Animal from './animal.model'
import QueryBuilder from '../../builder/QueryBuilder'
import { animalSearchableFields } from './animal.constant'
import { TAnimal } from './animal.interface'
import { uploadImgToCloudinary } from '../../utils/uploadImgToCloudinary'

const insertAnimal = async (file: any, payload: TAnimal) => {
  // file upload
  const cloudinaryRes = await uploadImgToCloudinary(
    `${payload.name}-${Date.now()}`,
    file.path,
  )
  if (cloudinaryRes) {
    payload.img = cloudinaryRes.secure_url
  }

  const animal = await Animal.create(payload)
  return animal
}

const getAllAnimals = async (query: Record<string, unknown>) => {
  const animalQuery = new QueryBuilder(Animal.find(), {
    ...query,
    sort: `name`,
  })
    .searchQuery(animalSearchableFields)
    .filterQuery()
    .sortQuery()
    .paginateQuery()
    .populateQuery([{ path: 'category', select: 'name' }])
    .fieldFilteringQuery()

  const result = await animalQuery?.queryModel
  const total = await Animal.countDocuments(animalQuery?.queryModel.getFilter())
  return { data: result, total }
}

const getSingleAnimalById = async (id: string) => {
  const animal = await Animal.findById(id)
  return animal
}

export const animalServices = {
  insertAnimal,
  getAllAnimals,
  getSingleAnimalById,
}
