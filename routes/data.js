const express= require('express')
const router= express.Router()

const sweetfunctions= require('../controllers/specialFunctions');
const api=  require('../controllers/api_controller')
const myapi=new api;
const sweet= new sweetfunctions;

const debitor=async (req,res,next)=>{
    try {
      //console.log(req.body)
        const validator=req.session.validator
        const {price}=req.body;
        const username=req.session.username;
        req.body.username=username;
        const prev_bal= await sweet.getwallet(username)
        const StoredPin= await sweet.getUserPin(username);
        const StoredValidator= await sweet.getValidator(username);
       if(StoredPin !== req.body.pin){
        return res.json({status:"fail",message:"incorrect transaction Pin"})

      }else if(StoredValidator!==validator){
        return res.json({status:"fail",message:"your session has expired, kindly logout and log in again"})

      }
      const debitor = await sweet.debitUser(username,price);
      if(debitor){
        return res.json(debitor)
       }
     const new_bal= await sweet.getwallet(username)
     req.body.prev_bal=prev_bal;
     req.body.new_bal=new_bal

       next()

    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

router.post('/data',debitor, myapi.getData)

module.exports=router;