const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({extended : true}))

var articles = [
    {
        "name" : "Day 1",
        "content": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt porro non velit omnis ea nulla nisi iste nemo maxime ex quis exercitationem mollitia aspernatur in illum, corporis cupiditate? Sapiente, eligendi."
    },
    {
        "name" : "Day 2",
        "content": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt porro non velit omnis ea nulla nisi iste nemo maxime ex quis exercitationem mollitia aspernatur in illum, corporis cupiditate? Sapiente, eligendi."
    }
]

// Home page
app.get('/', (req, res) => {
    res.render('pages/home', { articles : articles })
})

// Create new Article 
app.get('/create', (req, res) => {
    res.render('pages/create')
})



app.listen(3000, () => console.log('Server is running on port 3000'))