const express= require('express')
const router= express.Router()
const Oops= require('../controllers/data_plan_setting_controller')
const myOops=new Oops

router.get('/dataPlanSetting', myOops.getDataPlanSetting)
router.post('/dataPlanSetting', myOops.storeDataPlanSetting)

module.exports=router;