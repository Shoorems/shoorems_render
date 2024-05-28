const express= require('express')
const router= express.Router()
const Oops= require('../controllers/airtime_plan_setting_controller')
const myOops=new Oops

router.get('/airtimePlanSetting', myOops.getAirtimePlanSetting)
router.post('/airtimePlanSetting', myOops.storeAirtimePlanSetting)

module.exports=router;