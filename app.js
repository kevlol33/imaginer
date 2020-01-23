//***** Costante *****//
const express    = require('express');
const exphbs     = require('express-handlebars');
const mongoose   = require('mongoose');
const bodyParser = require('body-parser');
const fileupload = require('express-fileupload');
const app        = express();
const port       = process.env.PORT || 3000

//***** Middelware *****//
const articleValidPost       = require('./middleware/articleValidPost')
app.use("/articles/post", articleValidPost)


//***** Controleur *****//
    //** Articles **//
const articleAddController   = require('./controllers/articleAdd');
const articlePostController  = require('./controllers/articlePost');
const articlSingleController = require('./controllers/articleSingle');
const homePage               = require('./controllers/homePage');

    //** User **//
const userCreate            = require('./controllers/userCreate');
const userRegister          = require('./controllers/userRegister');
const userLogin             = require('./controllers/userLogin');
const userLoginAuth         = require('./controllers/userLoginAuth')



//***** Use Mongoose *****//
// const urlDb = "mongodb+srv://kev:Klm123@cluster0-tlcr7.mongodb.net/test?retryWrites=true&w=majority" 
const urlDb     = "mongodb://localhost:27017/blog"
mongoose.connect(urlDb, {useNewUrlParser: true, useUnifiedTopology: true});

//***** Moment *****//
var Handlebars               = require("handlebars");
var MomentHandler            = require("handlebars.moment");
MomentHandler.registerHelpers(Handlebars);

//***** Use *****//
app.use(express.static('public'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileupload())

//***** Hbs *****//
app.engine('hbs', exphbs({ defaultLayout: 'main' }));
app.set   ('view engine', 'hbs');

//***** Routes *****//
app.get ("/", homePage)

//***** Articles *****//
app.get ("/articles/:id", articlSingleController)
app.get ("/article/add", articleAddController)
app.post("/articles/post", articlePostController)

//***** User *****//
app.get('/user/create', userCreate)
app.post('/user/register', userRegister)
app.get('/user/login', userLogin)
app.post('/user/loginAuth', userLoginAuth)

//***** Contact *****//
app.get("/contact", (req, res) => {
    res.render("contact")
})

//*** Savoir sur quel cochon tourne le site ***//
app.listen(port, function () {
    console.log("Le serveur tourne sur le Cochon " + port);
})