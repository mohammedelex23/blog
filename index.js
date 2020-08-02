const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({extended : true}))

mongoose.connect('mongodb://localhost:27017/blogDB', {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('Seccessfully conected to mongoDB')
    }
})
mongoose.set('useCreateIndex', true);


// Article Schema
const articleSchema = mongoose.Schema({
    title : {
        type: String,
        unique: true
    },
    post : String
})

// Article Model
const Article = mongoose.model('Articl', articleSchema)


// Home page
app.get('/', (req, res) => {

    Article.find((err, articles) => {
        if (err) {
            console.log(err)
            res.render('pages/errorPage', {"error": err})
        } else {
            res.render('pages/home', { articles : articles})
        }
    })
})

// Create new article page
app.get('/create', (req, res) => {
    res.render('pages/create')
})

// Create new article
app.post('/create', (req, res) => {

    var title = req.body.title
    var post = req.body.post

    var article = new Article({
        title,
        post
    })

    article.save((err) => {
        if (err) {
            res.render('pages/errorPage', {"error": err})
        } else {
            res.redirect('/')
        }
    })    
})

// Serve specific article with name
app.get('/:articleName', (req, res) => {

    var articleName = decodeURIComponent(req.params.articleName)
    Article.findOne({title: articleName}, (err, article) => {
        if (err) {
            res.render('pages/errorPage', {"error": err})
        } else {
            res.render('pages/article', { article : article })
        }
    })
})



app.listen(3000, () => console.log('Server is running on port 3000'))