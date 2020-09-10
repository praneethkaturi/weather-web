const path = require('path')
const express = require('express');
const hbs = require('hbs')
const { dir } = require('console');
const geocode = require('./utils/geocode')
const weather = require('./utils/weather')
const app = express()
const port = process.env.PORT || 3000
cors = require('cors')
app.use(cors())

const dir_path = path.join(__dirname, '../public/');
const partials_path = path.join(__dirname, '../public/partials')
app.use(express.static(dir_path))
app.set('view engine', 'hbs')
hbs.registerPartials(partials_path)

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'PK'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About me',
        name: 'PK'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        paragraph: 'my para',
        title: 'Help',
        name: 'PK'
    })
})

app.get('/weather', (req,res) =>{
    if(!req.query.address){
        return res.send({
            error : 'Please provide an address!'
        });
    }

    geocode(req.query.address, (error, {Latitude, Longitude, Place} = {}) => {
        if(error){
            return res.send(error)
        }
        weather({Latitude, Longitude}, (error, forecast) =>{
            if(error){
                return res.send(error)
            }

            res.send({
                forecast,
                location: Place,
                address: req.query.address
            })
        })
    })

})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'PK',
        error_msg: 'Cannot find page',
    })
})

app.listen(port, () => {
    console.log("Server is up on port " + port);
})