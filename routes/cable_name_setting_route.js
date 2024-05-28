const express= require('express')
const router= express.Router()
const Oops= require('../controllers/cable_name_setting_controller')
const myOops=new Oops

router.get('/cableNameSetting', myOops.getCableNameSetting)
router.post('/cableNameSetting', myOops.storeCableNameSetting)

module.exports=router;