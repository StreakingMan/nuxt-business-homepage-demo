import mongoose from 'mongoose'

/* const productSchema = new mongoose.Schema({
    title: String,
    acc: String,
    yearAcc: String,
    manager: String,
    updatedAt: String,
    createdAt: String,
    netAssetValue: String,
    startingPoint: String,
    netAssetValueTend: Array,
    '500ValueTend': Array,
    timeTend: Array,
    netAssetValueStartLabel: String,
    netAssetValueEndLabel: String,
}) */

const ProductModel = mongoose.model('product', new mongoose.Schema(), 'product')

export default ProductModel
