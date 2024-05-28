const express = require('express')
const router = express.Router()
const sweetfunctions = require('../controllers/specialFunctions');
const api = require('../controllers/api_controller')
const myapi = new api;
const sweet = new sweetfunctions;


const debitor = async (req, res, next) => {
    try {
       // console.log(req.body)
        const username=req.session.username;
        req.body.username=username
        const validator=req.session.validator;
        const { numbers, charge,pin } = req.body;
        let numbersLength = numbers.split(',').length;
        const amount = numbersLength * charge;
        req.body.amount=amount;
        const prev_bal= await sweet.getwallet(username);
        const StoredPin= await sweet.getUserPin(username);
        const StoredValidator= await sweet.getValidator(username);
       if(StoredPin !== pin){
        return res.json({status:"fail",message:"incorrect transaction Pin"})

      }else if(StoredValidator!==validator){
        return res.json({status:"fail",message:"your session has expired, kindly logout and log in again"})

      }
        const result = await sweet.debitUser(username, amount);
        if (result) {
           return res.json(result)
        }
        const new_bal= await sweet.getwallet(username);
        req.body.new_bal=new_bal
        req.body.prev_bal=prev_bal
       next()
    //  console.log(req.body)

    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}


router.post('/sms',  debitor, myapi.getSms)

module.exports = router;