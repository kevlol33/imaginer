const mongoose = require('mongoose')
const Article = require('./database/model/Article')

mongoose.connect('mongodb://localhost:27017/blog-test', {useNewUrlParser: true, useUnifiedTopology: true});

Article.findByIdAndUpdate("5e25882ede6ed614444b72c8", 
    {title: 'Spider 72000'}, (error, post) => {
    console.log(error, post);

})


/*
Article.findById("5e25882ede6ed614444b72c8", (error,articles) => {
    console.log(error,articles);
    
})
*/

/*
Article.find({

    intro: '2test',

}, (error, articles) => {
    console.log(error, articles);
    
})
*/
/*
Article.create({
    title: "Spider 72",
    intro: '2test',
    content: "tesr2x",
}, (error, post) => {
    console.log(error, post);
}
)
*/