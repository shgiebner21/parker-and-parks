const express = require('express')
const app = express()
const port = process.env.PORT || 8082
const bodyParser = require('body-parser')
const HTTPError = require('node-http-error')
const cors = require('cors')

const {postFamily, postChildren} = require('./dal.js')

app.use(cors({
    credentials: true
}))
app.use(bodyParser.json())


///////////////////////
//   family
//////////////////////

app.post('/family', function(req, resp, next) {
  postFamily(req.body, function(err, dalResp) {
    if (err) return next(new HTTPError(err.status, err.message, err))
    resp.status(201).send(dalResp)
  })
})

app.post('/children', function(req, resp, next) {
  postChildren(req.body, function(err, dalResp) {
    if (err) return next(new HTTPError(err.status, err.message, err))
    resp.status(201).send(dalResp)
  })
})





///////////////////////
//   park
//////////////////////

app.get('/park_hampton_park', function(req, resp, next) {
  getHamptonPark(function(err, parks) {
    if (err) return next(new HTTPError(err.status, err.message, err))
    resp.status(200).send(parks)
  })
})


app.use(function(err, req, resp,next) {
  console.log(req.method, " ", req.path, "error: ", err)
  resp.status(err.status || 500)
  resp.send(err)
})

app.listen(port, function() {
  console.log('API is up and running on port ', port)
})
