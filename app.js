//***** Costante *****//
const express         = require('express');
const exphbs          = require('express-handlebars');
const mongoose        = require('mongoose');
const bodyParser      = require('body-parser');
const fileupload      = require('express-fileupload');
const expressSession  = require('express-session');
const MongoStore      = require('connect-mongo');
const connectFlash    = require('connect-flash');
const {stripTags}       = require('./helpers/hbs');

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
const userLoginAuth         = require('./controllers/userLoginAuth');
const userlogout            = require('./controllers/userLogout');

    //** Auth **//
const auth = require("./middleware/auth");
const redirectAuthSuccess = require('./middleware/redirectAuthSucess')

//***** Mongoose *****//
// const urlDb  = "mongodb+srv://kev:Klm123@cluster0-tlcr7.mongodb.net/test?retryWrites=true&w=majority"// 
const urlDb     = "mongodb://localhost:27017/blog"
mongoose.connect(urlDb, {useNewUrlParser: true, useUnifiedTopology: true});

//***** Express() *****//
const app = express();
const mongoStore = MongoStore(expressSession);
    //*** Use ***//
app.use(connectFlash())
app.use(fileupload())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'));
app.use(expressSession({
    secret: 'securite',
    name: 'biscuit',
    saveUninitialized: true,
    resave: false,

    store: new mongoStore(
            { mongooseConnection: mongoose.connection }
    )
}))
//***** Hbs *****//
//***** Moment *****//
var Handlebars    = require("handlebars");
var MomentHandler = require("handlebars.moment");
MomentHandler.registerHelpers(Handlebars);
// limit an array to a maximum of elements (from the start)
Handlebars.registerHelper('limit', function (arr, limit) {
    if (!Array.isArray(arr)) { return []; }
    return arr.slice(0, limit);
  });
app.engine('hbs', exphbs({ 
    helpers: {stripTags: stripTags },
    defaultLayout: 'main' }));
app.set   ('view engine', 'hbs');
app.use('*', (req, res, next) => {
    res.locals.user = req.session.userId;
    console.log(res.locals.user);
    next()
    
})


//***** Middelware *****//
const articleValidPost = require('./middleware/articleValidPost')
app.use("/articles/post", articleValidPost)
app.use("/articles/add,", auth)

//***** Articles *****//
app.get ("/", homePage)
app.get ("/articles/:id", articlSingleController)
app.get ("/article/add", auth, articleAddController)
app.post("/articles/post",auth, articleValidPost, articlePostController)

//***** User *****//
app.get('/user/create',     redirectAuthSuccess, userCreate)
app.post('/user/register',  redirectAuthSuccess, userRegister)
app.get('/user/login',      redirectAuthSuccess, userLogin)
app.post('/user/loginAuth', redirectAuthSuccess, userLoginAuth)
app.get('/user/logout', userlogout)

//***** Contact *****//
app.get       ("/contact", (req, res) => {
    res.render("contact")
})

//***** Error 404 *****//
app.use ((req, res) => {
    res.render('error404')
})

//*** Savoir sur quel cochon tourne le site ***//
const port = process.env.PORT || 3000
app.listen (port, function () {
    console.log("Le serveur tourne sur le Cochon " + port);
})