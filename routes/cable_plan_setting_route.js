const express= require('express')
const router= express.Router()
const Oops= require('../controllers/cable_plan_setting_controller')
const myOops=new Oops

router.get('/cablePlanSetting', myOops.getCablePlanSetting)
router.post('/cablePlanSetting', myOops.storeCablePlanSetting)

module.exports=router;