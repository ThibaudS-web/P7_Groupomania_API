const express = require('express')
const rateLimit = require("express-rate-limit")
const app = express()

//Limit request : 10 per sec
const limiter = rateLimit({
  windowMs: 1000,  // 1 second
  max: 10 // limit each IP to 10 requests per seconds
});

//Setup headers
app.use((req, res, next) =>   {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
  })

  module.exports = app