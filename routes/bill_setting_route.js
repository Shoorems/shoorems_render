const express= require('express')
const router= express.Router()
const Oops= require('../controllers/bill_setting_controller')
const myOops=new Oops

router.get('/billSetting', myOops.getBillSetting)
router.post('/billSetting', myOops.storeBillRecord)

module.exports=router;