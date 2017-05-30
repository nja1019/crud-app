const express = require('express')
const app = express()
const bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))
app.set('view engine', 'ejs')
const MongoClient = require('mongodb').MongoClient

var db

MongoClient.connect('mongodb://admin:adminadmin@ds151431.mlab.com:51431/star-wars-quotes', function (err, database) {
	if(err) {
		return console.log(err)
	}
	db = database
	app.listen(3000, function () {
		console.log('Listening on 3000')
    })
})

app.get('/',  function(req, res) {
	db.collection('quotes').find().toArray(function (err, result) {
		if (err) return console.log(err)
		res.render('index.ejs', {quotes: result})
    })
})

app.post('/quotes', function(req, res)  {
	db.collection('quotes').save(req.body, function (err, result) {
		if (err) {
			return console.log(err)
		}
        console.log(req.body)
        console.log('Saved to database')
		res.redirect('/')
    })
})

app.put('/quotes', function (req, res) {
    db.collection('quotes').findOneAndUpdate({name: 'Yoda'},
        {
            $set: {
                name: req.body.name,
                quote: req.body.quote
            }
        }, {
            //Start with newest entries, if no quotes by Yoda, create new entry
            sort: {_id: -1},
            upsert: true
        }, function (err, result) {
            if(err) return res.send(err)
            res.send(result)
        })
})

app.del('/quotes', function (req, res) {
	db.collection('quotes').findOneAndDelete({name: req.body.name},
		function (err, result) {
			if(err) return res.send(500, err)
			res.json('A darth quote got deleted :/.')
        })
})
