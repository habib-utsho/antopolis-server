import Category from './category.model'
import QueryBuilder from '../../builder/QueryBuilder'
import { categorySearchableFields } from './category.constant'
import { TCategory } from './category.interface'

const insertCategory = async (payload: TCategory) => {
  const category = await Category.create(payload)
  return category
}

const getAllCategories = async (query: Record<string, unknown>) => {
  const categoryQuery = new QueryBuilder(Category.find(), {
    ...query,
    sort: `name`,
  })
    .searchQuery(categorySearchableFields)
    .filterQuery()
    .sortQuery()
    .paginateQuery()
    .fieldFilteringQuery()

  const result = await categoryQuery?.queryModel
  const total = await Category.countDocuments(
    categoryQuery?.queryModel.getFilter(),
  )
  return { data: result, total }
}

const getSingleCategoryById = async (id: string) => {
  const category = await Category.findById(id)
  return category
}

export const categoryServices = {
  insertCategory,
  getAllCategories,
  getSingleCategoryById,
}
