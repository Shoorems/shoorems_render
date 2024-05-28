const express= require('express')
const router= express.Router()
const Oops= require('../controllers/sms_setting_controller')
const myOops=new Oops

router.get('/smsSetting', myOops.getSetting)
router.post('/smsSetting', myOops.storeRecord)

module.exports=router;