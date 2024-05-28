const express = require('express')
const router = express.Router()
require('dotenv').config();
let uuid = require('uuid').v4();
const axios = require('axios');
const sweet = require("../controllers/specialFunctions");
const bankModel = require("../models/bankModel");
const creditor = new sweet
const bcrypt = require('bcrypt');
const storeHistory = require('../controllers/helperFunction');
const StoreRecord = new storeHistory;
const users = require("../models/users")
const wallet_model = require("../models/walletHistoryModel");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

const userInput = [
  check("username").escape(),
  check("password").escape()
]
const forgotInput = [
  check("email").escape()
    .isEmail()
  ,
]

const resetInput = [
  check("pwd").escape(),
  check("r_pwd").escape(),
  check("validator").escape()

]
const resetpin = [
  check("pwd").escape().isLength({ min: 4, max: 4 }).withMessage("the Pin must be of four digits"),
  check("r_pwd").escape().isLength({ min: 4, max: 4 }).withMessage("the Pin must be of four digits"),
  check("validator").escape()

]

const registerInput = [
  check("username").escape(),
  check("email").escape().isEmail(),
  check("phone").escape(),
  check("pin").escape()
    .isLength({ min: 4, max: 4 }).withMessage("the Pin must be of four digits")
  ,
  check("pwd").escape(),
  check("r_pwd").escape()
]


const register = async (req, res) => {


  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const msg = errors.array().map(item => item.msg)
      res.json({ success: "error", subject: "Registration Failed!", message: msg })
    } else {
      // res.json({ success: "success", message:"registration sucessful" })
      const { full_name, username, email, phone, pwd, r_pwd, pin } = req.body

      //checking for password repeat

      if (pwd !== r_pwd) {
        res.json({ success: "error", subject: "Registration Failed!", message: "Password and repeat password must be the same" })
        return

      }

      if (username === pwd) {
        res.json({ success: "error", subject: "Registration Failed!", message: "Username and password can not be the same" })
        return

      }
      //checking if user already register

      const result = await users.findOne({ $or: [{ username }, { email }, { phone }] })
      if (result) {
        res.json({ success: "error", subject: "Registration Failed!", message: "Either email or username or phone number has already been taken" })
        return
      } else {
        const fname = full_name.split(" ")[0]
        const lname = full_name.split(" ")[1]
        const url = null
      const bank1 = await StoreRecord.getAccount(full_name,username,email,phone,'');
      const bank2 = await StoreRecord.getAccount(full_name,username,email,phone,'providus');
      const bank3 = await StoreRecord.getAccount(full_name,username,email,phone,'paga');
     
        const date = new Date();

        const hashPass = await bcrypt.hash(`${pwd}`, 6)
        const store = await StoreRecord.storeUsers(full_name, username, phone, email, hashPass, "api", 0, pin, "myvalidator",url, date)
        res.status(200).json({ success: "success", subject: "Registration Successful!", message: "User has been registered successfully, kindly proceed to Login" })
        return
      }

    }

  } catch (error) {
    console.log(error.message)
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }


}


const login = async (req, res) => {

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const msg = errors.array().map(item => item.msg)
      return res.json({ success: "error", subject: "Error Occured!", message: msg })
    } else {

      const { username, password } = req.body;
      const result = await users.findOne({ username })
      if (result) {
        uuid = require('uuid').v4();
        const storedPass = result.pwd;
        const verifyPass = await bcrypt.compare(password, storedPass)

        if (!verifyPass) {
          return res.json({ success: "error", subject: "Login Failed!", message: "Invalid Password Entries!" })

        } else {
          req.session.validator = uuid;
          users.findOneAndUpdate({ username }, { validator: uuid }, { new: true }).then(result => {

          })

          if (username === "super_admin") {
            req.session.admin = username;
            req.session.save();
            return res.status(201).json({ success: "success", subject: "Login Successful!", message: "User login successful", path: "admin" })


          } else {
            const retrieveUsers = await users.findOne({ username });
            req.session.username = username;
            req.session.save();
            const full_name = retrieveUsers.fullName
             const email = retrieveUsers.email;
             const phone = retrieveUsers.phone;

            const bank1 = await bankModel.findOne({ username, bankName: "safehaven" });
            if (!bank1) {

              const safehaven = await StoreRecord.getAccount(full_name,username,email,phone,'safehaven');

            }
            const bank2 = await bankModel.findOne({ username, bankName: "providus" });
            if(!bank2){
              const providus = await StoreRecord.getAccount(full_name,username,email,phone,'providus');
      
            }
            const bank3 = await bankModel.findOne({ username, bankName: "paga" });
           
            if(!bank3){
              
              const paga = await StoreRecord.getAccount(full_name,username,email,phone, "paga");
      
            }
            
            res.status(201).json({ success: "success", subject: "Login Successful!", message: "User login successful", path: "user" })

          }


        }

      } else {
        return res.json({ success: "error", subject: "Login Failed!", message: "Invalid Username Entries" })

      }

    }

  } catch (error) {
    console.log(error.message)
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }

}




const reset = async (req, res) => {

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const msg = errors.array().map(item => item.msg)
      res.json({ success: "error", subject: "Error Occured!", message: msg })
    } else {
      const { pwd, r_pwd, validator } = req.body;
      if (pwd !== r_pwd) {
        res.json({ success: "error", subject: "Password Reset Failed!", message: "The two password entries must be the same" })
        return
      }

      jwt.verify(validator, "1210210009", (err, token) => {
        if (err) {
          res.json({ success: "error", subject: "Password Reset Failed!", message: "Invalid reset token" })
          return
        }

        const email = token.email
        users.findOneAndUpdate({ email }, { pwd }, { new: true }).then(result => {
          if (result) {
            res.json({ success: "success", subject: "Password Reset Successful!", message: "The password has been reseted successfully" })
          } else {
            res.json({ success: "error", subject: "Password Reset Failed!", message: "Something went wrong with Password reset process" })

          }

        })



      })


    }

  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
    console.log(error.message)
  }

}

const reset_pin = async (req, res) => {

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const msg = errors.array().map(item => item.msg)
      res.json({ success: "error", subject: "Error Occured!", message: msg })
    } else {
      const { pwd, r_pwd, validator } = req.body;
      if (pwd !== r_pwd) {
        res.json({ success: "error", subject: "Transaction Pin Reset Failed!", message: "The two PIN entries must be the same" })
        return
      }

      jwt.verify(validator, "1210210009", (err, token) => {
        if (err) {
          res.json({ success: "error", subject: "Transaction Pin Reset Failed!", message: "Invalid reset token" })
          return
        }

        const email = token.email
        users.findOneAndUpdate({ email }, { pin: pwd }, { new: true }).then(result => {
          if (result) {
            res.json({ success: "success", subject: "Transaction Pin Reset Successful!", message: "The Transaction Pin has been reseted successfully" })
          } else {
            res.json({ success: "error", subject: "Transaction Pin Reset Failed!", message: "Something went wrong with Transaction Pin reset process" })

          }

        })



      })


    }

  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
    console.log(error.message)
  }

}

const forgot = async (req, res) => {

  try {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const msg = errors.array().map(item => item.msg)
      res.json({ success: "error", subject: "Error Occured!", message: msg })
    } else {
      //console.log("the validation is successful")
      const { email } = req.body;
      const result = await users.findOne({ email })

      if (result) {

        jwt.sign({ email }, "1210210009", { expiresIn: "1h" }, (err, token) => {
          if (err) {
            res.json({ success: "error", subject: "Error Occured!", message: "fail to generate reset token" })
          }
          const body = `Dear user \n kindly reset your password via the reset link ${process.env.CLIENT_BASE_URL}/reset?validator=${token}`
          StoreRecord.sendEmail(email, "Password Reset", body)

        })

        res.json({ success: "success", subject: "Success", message: "A Link for your password reset has been forwarded to your registered email" })
      } else {
        res.json({ success: "error", subject: "Password Reset Failed!", message: "User do not exist on our database" })

      }

    }

  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
    console.log(error.message)
  }

}

const forgot_pin = async (req, res) => {

  try {

    const username = req.session.username;
    console.log(username)

    if (username) {

      const myusers = await users.findOne({ username })
      const email = myusers.email
      jwt.sign({ email }, "1210210009", { expiresIn: "1h" }, (err, token) => {
        if (err) {
          res.json({ success: "error", subject: "Error Occured!", message: "fail to generate reset token" })
          return
        }
        const body = `Dear user \n kindly reset your Transaction Pin via the reset link ${process.env.CLIENT_BASE_URL}/reset_pin?validator=${token}`
        StoreRecord.sendEmail(email, "Transaction Pin Reset", body)

        res.json({ success: "success", subject: "success", message: "A pin reset procedure  has been forwarded to your email address successfully" })

      })


    } else {

      res.json({ success: "error", subject: "Error Occured!", message: "You have an expire session kinly log out and log in again" })

    }


  } catch (error) {
    console.log(error.message)
    res.status(500).json({ success: "error", subject: "Error Occured!", message: "fail to generate reset token" });
  }

}


router.post('/login', userInput, login)
router.post('/forgot', forgotInput, forgot)
router.get('/forgot_pin', forgot_pin)
router.post('/register', registerInput, register)
router.post('/reset', resetInput, reset)
router.post('/reset_pin', resetInput, reset_pin)

router.post("/update_webhook", (req, res) => {

  const username = req.session.username;
  const { url } = req.body
  if (username) {

    users.findOneAndUpdate({ username }, { webhook_url: url }, { new: true }).then(result => {
      if (result) {
        res.json({ success: "success", subject: "Successful!", message: "Your webhook url has been updated successfully" })
      } else {
        res.json({ success: "error", subject: "Failed!", message: "Something went wrong with webhook update" })

      }

    })

  } else {

    res.json({ success: "error", subject: "Error Occured!", message: "You have an expire session kinly log out and log in again" })

  }



})

router.get("/authorization", async (req, res) => {

  const username = req.session.username;
  if (username) {
    const myusers = await users.findOne({ username })
    const email = myusers.email
    jwt.sign({ email, username }, "1210210009", { expiresIn: "50y" }, (err, token) => {
      if (err) {
        res.json({ success: "error", subject: "Error Occured!", message: "fail to generate authorization token" })
        return
      }

      res.json({ token })

    })

  } else {
    res.json({ success: "error", subject: "Error Occured!", message: "You have an expire session kinly log out and log in again" })

  }



})

router.post("/stw/webhook",  async (req, res) => {  

  const {sessionId,
    accountNumber,
    tranRemarks,
    transactionAmount,
    settledAmount,
    feeAmount,
    vatAmount,
    currency,
    initiationTranRef,
    settlementId,
    sourceAccountNumber,
    sourceAccountName,
    sourceBankName,
    channelId,
    tranDateTime
  } = req.body
  
    uuid = require('uuid').v4();
    const acct = await bankModel.findOne({accountNumber});
    const username=acct.username;
    const myusers = await users.findOne({username});
   // const username = myusers.username;
    const prev_bal = myusers.wallet;
    const credit_amount = transactionAmount - 50;
    const funded = await creditor.creditUser(username, credit_amount);
    const new_bal = await creditor.getwallet(username);
    const date = new Date();
    const storing = await StoreRecord.storeWalletHistory(uuid, username, `Your wallet has been funded with ${credit_amount}`, credit_amount, prev_bal, new_bal, "success", date)
     res.status(200).send("success")

  
})

router.post("/data/webhook", async (req, res) => {

  const id = req.body["request-id"];
  const { status } = req.body;


  if (status == "fail" || status == "failed") {

    const date = new Date();
    uuid = require('uuid').v4();
    const mywallet = await wallet_model.findOne({ id })
    const refund_amount = mywallet.amount
    const username = mywallet.username;
    const user_data = await users.findOne({ username })
    const url = user_data.webhook_url
    const prev_bal = user_data.wallet;
    const requestBody = req.body;
    
    if (url) {
      axios.post("" + url, requestBody)
        .then(response => console.log(response.data))
        .catch(err => console.log(err))

    }

    const funding = await creditor.creditUser(username, refund_amount);
    const dataBal = await users.findOne({ username })
       const new_bal = dataBal.wallet
    const storing = await StoreRecord.storeWalletHistory(uuid, username, `You have have been refunded with the sum of ${refund_amount} due to a failed transaction with id ${id}`, refund_amount, prev_bal, new_bal, "success", date)

    wallet_model.findOneAndUpdate({ id }, { status}, { new: true }).then(result => {


    })

    res.status(200).send("success")


  }



})

module.exports = router;
