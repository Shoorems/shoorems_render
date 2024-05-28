const express= require('express')
const router= express.Router()
const Oops= require('../controllers/data_name_setting_controller')
const myOops=new Oops

router.get('/dataNameSetting', myOops.getDataNameSetting)
router.post('/dataNameSetting', myOops.storeDataNameSetting)

module.exports=router;