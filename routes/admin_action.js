const nodemailer = require('nodemailer');
const express = require('express')
const router = express.Router()
let uuid = require('uuid').v4();
const users = require("../models/users")
const sweetfunctions = require('../controllers/specialFunctions');
const sweet = new sweetfunctions;
const storeHistory = require('../controllers/helperFunction');
const storage = new storeHistory


const debitor = async (req, res) => {
    try {

        if (req.session.admin) {


            uuid = require('uuid').v4();
            const { amount, username } = req.body
            const prev_bal = await sweet.getwallet(username);
            const debitor = await sweet.debitUser(username, amount);
            const new_bal = await sweet.getwallet(username);
            const date = new Date();
            storage.storeWalletHistory(uuid, username, `you have been debited with the sum of N${amount} by Admin`, amount, prev_bal, new_bal, "success", date)



        }


    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

const Email = async (req, res) => {
    try {

        if (req.session.admin) {
            const { subject, body, email } = req.body

            if (Array.isArray(email)) {
                for (let i = 0; i < email.length; i++) {
                    storage.sendEmail(email[i], subject, body)
                }
            } else {
                storage.sendEmail(email, subject, body)

            }




        }

    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}
const creditor = async (req, res) => {
    try {

        if (req.session.admin) {

            const { amount, username } = req.body

            uuid = require('uuid').v4();
            const prev_bal = await sweet.getwallet(username);
            const debitor = await sweet.creditUser(username, amount);
            const new_bal = await sweet.getwallet(username);
            const date = new Date();
            storage.storeWalletHistory(uuid, username, `you have been credited with the sum of N${amount} by Admin`, amount, prev_bal, new_bal, "success", date)


        }

    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }

}
const upgrader = async (req, res) => {

    try {

        if(req.session.admin){

            const { action, username } = req.body;
            if (req.session.admin) {
    
                const upgrade = await sweet.upgradeUser(username, action)
    
    
    
            }
    


        }
       


    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

const checkSession = async (req, res) => {

    try {
        if (!req.session.admin) {

            res.json({ session: false })
        } else {

            res.json({ session: true })

        }



    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

const session_destroy = async (req, res) => {

    try {
        req.session.destroy();
        res.status(200).send("success")

    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

const delete_user = async (req, res) => {

    try {
        if (req.session.admin) {
            const { username } = req.body;
            const deleting = await users.deleteMany({ username });
        }


    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

router.post('/debituser', debitor)
router.post('/credituser', creditor)
router.post('/upgradeuser', upgrader)
router.post('/emailuser', Email)
router.post('/delete_user', delete_user)
router.get('/admin_session', checkSession)
router.get('/session_destroy', session_destroy)

module.exports = router;