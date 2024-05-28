const express= require('express')
const router= express.Router()
const Oops= require('../controllers/education_setting_controller')
const myOops=new Oops

router.get('/formdata', myOops.getSetting)
router.post('/formdata', myOops.storeRecord)

module.exports=router;