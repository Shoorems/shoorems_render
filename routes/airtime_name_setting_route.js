const express= require('express')
const router= express.Router()
const Oops= require('../controllers/airtime_name_setting_controller')
const myOops=new Oops

router.get('/airtimeNameSetting', myOops.getAirtimeNameSetting)
router.post('/airtimeNameSetting', myOops.storeAirtimeNameSetting)

module.exports=router;