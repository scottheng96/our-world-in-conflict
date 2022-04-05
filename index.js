const PORT = 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

const app = express()

const articles = []

app.get('/', (req,res) => {
    res.json('Welcome to Our World In Conflict')
})

app.get('/news', (req,res) => {
    axios.get('https://www.nbcnews.com/world/russia-ukraine-news')
        .then((response) => {
            const html  = response.data
            const $ = cheerio.load(html)

            $('a:contains(["Russia", "Putin])', html).each(function() {
                const title = $(this).text()
                const url = $(this).attr('href')
                articles.push({
                    title,
                    url
                })
            })
            res.json(articles)
        }).catch((err) => console.log(err))
})

app.listen(PORT, () => console.log(`server running on PORT: ${PORT}`))