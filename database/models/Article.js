//***** Impot Mongoose *****// 
const mongoose = require('mongoose')

//***** Shema *****//
const ArticleShema = new mongoose.Schema({

    title: String,
    content: String,
    author: String,
    image: String,
    createDate: {
        type: Date,
        default: new Date()
    }


})

//***** Send Data to Database *****//
const Article = mongoose.model('Article', ArticleShema)

//***** Export Article *****//
module.exports = Article