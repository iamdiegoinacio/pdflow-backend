const { Router } = require('express')
const router = Router()

//controllers
const indexController = require('./controllers/indexController')
const pdfCreatorController = require('./controllers/pdfCreatorController')

//index route
router.get('/', indexController.index)

//pdf creator routes
router.post('/pdf', pdfCreatorController.create)

module.exports = router
