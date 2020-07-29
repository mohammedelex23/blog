const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({extended : true}))

var articles = [
    {
        "title" : "Day 1",
        "post": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt porro non velit omnis ea nulla nisi iste nemo maxime ex quis exercitationem mollitia aspernatur in illum, corporis cupiditate? Sapiente, eligendi. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt porro non velit omnis ea nulla nisi iste nemo maxime ex quis exercitationem mollitia aspernatur in illum, corporis cupiditate? Sapiente, eligendi. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt porro non velit omnis ea nulla nisi iste nemo maxime ex quis exercitationem mollitia aspernatur in illum, corporis cupiditate? Sapiente, eligendi. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt porro non velit omnis ea nulla nisi iste nemo maxime ex quis exercitationem mollitia aspernatur in illum, corporis cupiditate? Sapiente, eligendi."
    },
    {
        "title" : "Day 2",
        "post": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt porro non velit omnis ea nulla nisi iste nemo maxime ex quis exercitationem mollitia aspernatur in illum, corporis cupiditate? Sapiente, eligendi. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt porro non velit omnis ea nulla nisi iste nemo maxime ex quis exercitationem mollitia aspernatur in illum, corporis cupiditate? Sapiente, eligendi. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt porro non velit omnis ea nulla nisi iste nemo maxime ex quis exercitationem mollitia aspernatur in illum, corporis cupiditate? Sapiente, eligendi. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt porro non velit omnis ea nulla nisi iste nemo maxime ex quis exercitationem mollitia aspernatur in illum, corporis cupiditate? Sapiente, eligendi."
    }
]

// Home page
app.get('/', (req, res) => {
    res.render('pages/home', { articles : articles })
})

// Create new article page
app.get('/create', (req, res) => {
    res.render('pages/create')
})

// Create new article
app.post('/create', (req, res) => {

    var title = req.body.title
    var post = req.body.post

    var article = articles.filter(article => article.title === title)

    if (article.length === 0 || article === undefined) {
        articles.push({
            "title" : title,
            "post" : post
        })
        res.redirect('/')
    } else {
        res.render('pages/errorPage', {"error" : "Article with this name already exist !"})
    }

    
})

// Serve specific article with name
app.get('/:articleName', (req, res) => {
    var articleName = req.params.articleName
    var article = articles.filter((article) => article.title === articleName)

    if (article.length === 0 || article === undefined) {
        res.render('pages/errorPage', {"error" : "OOPS ! No article related to this name"})
    } else {
        console.log(article)
        res.render('pages/article', { article : article })
    }
})



app.listen(3000, () => console.log('Server is running on port 3000'))