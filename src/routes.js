const express = require('express')
const AwsController = require('./controllers/AwsController')
const multer = require('multer')


const routes = express.Router()
const upload = multer()

routes.get('/', AwsController.index)
routes.post('/login', upload.any(), AwsController.Login)
routes.post('/register', upload.any(), AwsController.Register)

module.exports = routes