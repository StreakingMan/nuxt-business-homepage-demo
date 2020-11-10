import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    title: String,
    acc: String,
    manager: String,
    updatedAt: String,
    createdAt: String,
    netAssetValue: String,
    startingPoint: String,
    netAssetValueTend: Array,
    netAssetValueStartLabel: String,
    netAssetValueEndLabel: String,
})

const ProductModel = mongoose.model('product', productSchema, 'product')

export default ProductModel
