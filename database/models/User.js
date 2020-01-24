//***** Impot Mongoose *****// 
const mongoose = require('mongoose')

//***** Bcrypt *****//
const bcrypt = require('bcrypt')

//***** Shema *****//
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Le nom est obligatoire !' ]

    },
    email: {
        type: String,
        required: [true,"L'e-mail est obligatoire !" ],
        unique: true
    },
    password: {
        type: String,
        required: [true,'Le mot de passe est obligatoire !' ]
    },
})
UserSchema.pre('save', function (next) {
    const user = this 
    bcrypt.hash(user.password, 10, (error, encrypted) => {
        user.password = encrypted
        next()
    })
})
//***** Send Data to Database *****//
// const Article = mongoose.model('Article', ArticleShema)

//***** Export Article *****//
module.exports = mongoose.model("User", UserSchema)


    