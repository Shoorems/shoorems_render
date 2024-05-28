const express = require('express')
const router = express.Router()
//const session=require("express-session")
const sweetfunctions = require('../controllers/specialFunctions');
const api = require('../controllers/api_controller')
const myapi = new api;
const sweet = new sweetfunctions;


const debitor = async (req, res, next) => {
    try {
        
        const validator=req.session.validator
        const { amount,percentage,pin } = req.body;
        const myAmount=parseInt(amount)
        const myPercentage=parseInt(percentage)
        const charge = myAmount - myPercentage/100* myAmount
        req.body.charge=charge
        const username=req.session.username;
        req.body.username=username;
        const prev_bal= await sweet.getwallet(username)
        const StoredPin= await sweet.getUserPin(username);
        const StoredValidator= await sweet.getValidator(username);
       if(StoredPin !== pin){
       return res.json({status:"fail",message:"incorrect transaction Pin"})

      }else if(StoredValidator!==validator){
        return res.json({status:"fail",message:"your session has expired, kindly logout and log in again"})

      } 
      
      const debitor = await sweet.debitUser(username,charge);
      if(debitor){
        return res.json(debitor)
       }

        const new_bal= await sweet.getwallet(username)
        req.body.prev_bal=prev_bal;
        req.body.new_bal=new_bal;
     //  console.log(req.body)
         next()

    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}


router.post('/airtime',  debitor, myapi.getAirtime)

module.exports = router;