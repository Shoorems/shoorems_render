const express= require('express')
const router= express.Router()
const sweetfunctions= require('../controllers/specialFunctions');
const api=  require('../controllers/api_controller')
const myapi=new api;
const sweet= new sweetfunctions;


const debitor=async (req,res,next)=>{

    try {
        const validator=req.session.validator
        const username=req.session.username;
        req.body.username=username
        const {pin,price}=req.body
       const prev_bal= await sweet.getwallet(username);
        const StoredPin= await sweet.getUserPin(username);
        const StoredValidator= await sweet.getValidator(username);
       if(StoredPin !== pin){
        return res.json({status:"fail",message:"incorrect transaction Pin"})

      }else if(StoredValidator!==validator){
        return res.json({status:"fail",message:"your session has expired, kindly logout and log in again"})

      }
      const result = await sweet.debitUser(username, price);
      
      if(result){
        return res.json(result)
       }
      const new_bal= await sweet.getwallet(username)
      req.body.prev_bal=prev_bal
      req.body.new_bal=new_bal
      //console.log(req.body)
       next()
    
    
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }

}


router.post('/cable', debitor, myapi.getCable)
router.post('/cable_validator', myapi.validateIuc)

module.exports=router;