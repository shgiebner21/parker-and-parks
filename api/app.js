const express = require('express')
const app = express()
const port = process.env.PORT || 8082
const bodyParser = require('body-parser')
const HTTPError = require('node-http-error')
const cors = require('cors')

const {postFamily, postChildren, listChildren,
       getChild, listBadges, getFamilies, getParks,
       getPark} = require('./dal.js')

app.use(cors({
    credentials: true
}))
app.use(bodyParser.json())


/////////////////////////////////////////////
//   family
/////////////////////////////////////////////

app.post('/family', function(req, resp, next) {
  postFamily(req.body, function(err, dalResp) {
    if (err) return next(new HTTPError(err.status, err.message, err))
    resp.status(201).send(dalResp)
  })
})

app.get('/family', function(req, resp, next) {
  const startKey = req.query.startkey ? req.query.startkey : undefined
  const limit = req.query.limit ? req.query.limit : undefined

  getFamilies(startKey, limit, function(err, dalResp) {
    if (err) return next(new HTTPError(err.status, err.message, err))
    resp.status(200).send(dalResp)
  })
})





/////////////////////////////////////////////
//   children
/////////////////////////////////////////////
app.post('/children', function(req, resp, next) {
  postChildren(req.body, function(err, dalResp) {
    if (err) return next(new HTTPError(err.status, err.message, err))
    resp.status(201).send(dalResp)
  })
})

app.get('/children', function(req, resp, next) {
  const startKey = req.query.startkey ? req.query.startkey : undefined
  const limit = req.query.limit ? req.query.limit : undefined

  listChildren(startKey, limit, function(err, children) {
    if (err) return next(new HTTPError(err.status, err.message, err))
    return resp.status(200).send(children)
  })
})

app.get('/children/:id', function(req, resp, next) {
  getChild(req.params.id, function(err, child) {
    if (err) return next(new HTTPError(err.status, err.message, err))
    resp.status(200).send(child)
  })
})

/////////////////////////////////////////////
//   badges
/////////////////////////////////////////////
app.get('/badges', function(req, resp, next) {
  const startKey = req.query.startkey ? req.query.startkey : undefined
  const limit = req.query.limit ? req.query.limit : undefined

  listBadges(startKey, limit, function(err, badges) {
    if (err) return next(new HTTPError(err.status, err.message, err))
    resp.status(200).send(badges)
  })
})

/////////////////////////////////////////////
//   park
/////////////////////////////////////////////

app.get('/parks', function(req, resp, next) {
  const startKey = req.query.startkey ? req.query.startkey : undefined
  const limit = req.query.limit ? req.query.limit : undefined

  getParks(startKey, limit, function(err, parks) {
    if (err) return next(new HTTPError(err.status, err.message, err))
    resp.status(200).send(parks)
  })
})

app.get('/parks/:id', function(req, resp, next) {
  getPark(req.params.id, function(err, park) {
    if (err) return next(new HTTPError(err.status, err.message, err))
    resp.status(200).send(park)
  })
})






/////////////////////////////////////////////
//   helper functions
/////////////////////////////////////////////
app.use(function(err, req, resp,next) {
  console.log(req.method, " ", req.path, "error: ", err)
  resp.status(err.status || 500)
  resp.send(err)
})

app.listen(port, function() {
  console.log('API is up and running on port ', port)
})
