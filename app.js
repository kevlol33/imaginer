//***** Costante *****//
const express    = require('express');
const exphbs     = require('express-handlebars');
const mongoose   = require('mongoose');
const bodyParser = require('body-parser');
const fileupload = require('express-fileupload');
const path       = require('path')
const app        = express();
const port       = process.env.PORT || 3000


//***** Controleur *****//
const createArticleController = require('./controllers/createArticle');
const homePage = require('./controllers/homePage');


//***** Use Mongoose *****//
const urlDb = "mongodb+srv://kev:Klm123@cluster0-tlcr7.mongodb.net/test?retryWrites=true&w=majority" 
// const urlDb = 'mongodb://localhost:27017/blog'
mongoose.connect(urlDb, {useNewUrlParser: true, useUnifiedTopology: true});

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
app.listen(port, function () {
    console.log("Le serveur tourne sur le Cochon " + port);
})

//*****lololololololol *****//