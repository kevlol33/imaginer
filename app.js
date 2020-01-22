//***** Costante *****//
const express    = require('express');
const exphbs     = require('express-handlebars');
const mongoose   = require('mongoose');
const bodyParser = require('body-parser');
const fileupload = require('express-fileupload');
const path       = require('path')
const app        = express();

//***** Controleur *****//
const createArticleController = require('./controllers/createArticle');
const homePage = require('./controllers/homePage');


//***** Use Mongoose *****//
mongoose.connect('mongodb://localhost:27017/blog', {useNewUrlParser: true, useUnifiedTopology: true});

//***** Moment *****//
var Handlebars = require("handlebars");
var MomentHandler = require("handlebars.moment");
MomentHandler.registerHelpers(Handlebars);

//***** Use *****//
app.use(express.static('public'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileupload())

//***** Hbs *****//
app.engine('hbs', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'hbs');

//***** Middelware *****//
const middleware = (req, res, next) => {
    if(!req.files) {
        return res.redirect ('/')
    }
    console.log("Je suis le Middleware");
    next()
}
app.use("/articles/post", middleware)

//***** Routes *****//
app.get ("/", )
app.get("/contact", (req, res) => {
    res.render("contact")
})

//***** Articles *****//
app.get ("/article/add", createArticleController)

//***** Post *****//


app.post("/articles/post", (req, res) => {

    const { image } = req.files;
    const uploadFile = path.resolve(__dirname, 'public/articles', image.name);
    image.mv(uploadFile, (error, post) => {
        Post.create(
            {
                ...req.body,
                image : `/articles/${image.name}`
            }
            , (error, post) => {
            res.redirect('/')
        })
    })
})



//*** Savoir sur quel cochon tourne le site ***//
app.listen(3000, function () {
    console.log("Le serveur tourne sur le Cochon 3000");
})

//*****lololololololol *****//