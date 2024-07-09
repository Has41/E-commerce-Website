import errorHandler from "../utils/errorHandler.js"
import Category from "../model/Category.js"

const createCategory = async (req,res,next) => {
    try {
        const { name } = req.body

        if (!name) {
            return errorHandler(401, 'Name is required!')
        }

        const existingCategory = await Category.findOne({ name })

        if (!existingCategory) {
            const newCategory = new Category({ name })
            const savedCategory = await newCategory.save()
            return res.status(201).json(savedCategory)
        } else {
            return res.status(409).json({ message: 'Category already exists' })
        }
        
    } catch (err) {
        console.error(err)
        return next(err)
    }
}

const editCategory = async (req,res,next) => {
    try {
        const { name } = req.body
        const { id } = req.params
        const category = await Category.findByIdAndUpdate(id, { name }, { new: true })
        return res.send(200).json(category)
    } catch (err) {
        return next(err)
    }
}

const getCategory = async (req,res,next) => {
    try {
        const editCategory = await Category.find({})
        return res.status(200).json(editCategory)
    } catch (err) {
        return next(err)
    }
}

const deleteCategory = async (req,res,next) => {
    try {
        const { id } = req.params
        const removeCategory = await Category.findByIdAndDelete(id)
        return res.status(200).json(removeCategory)
    } catch (err) {
        return next(err)
    }
}

export { createCategory, editCategory, getCategory, deleteCategory }