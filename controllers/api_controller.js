require('dotenv').config();
const axios = require('axios');
let uuid = require('uuid').v4();
const storeHistory = require('./helperFunction')
const sweetfunctions = require('./specialFunctions')
const creditor = new sweetfunctions
const myhelper = new storeHistory
class apis {


    async getData(req, res) {

        try {

            const { price_label, data_name, data_volume, phone, profit, price, net_id, api_id, username, prev_bal, new_bal, api } = req.body;

            uuid = require('uuid').v4();


            let API_URL, API_TOKEN;

            switch (req.body.api) {
                case 'api1':
                    API_URL = `${process.env.API_URL1}`
                    API_TOKEN = `${process.env.API_TOKEN1}`
                    break;

                case 'api2':
                    API_URL = `${process.env.API_URL2}`
                    API_TOKEN = `${process.env.API_TOKEN2}`
                    break;

                case 'api3':
                    API_URL = `${process.env.API_URL3}`
                    API_TOKEN = `${process.env.API_TOKEN3}`
                    break;

            }

            const requestBody = {
                network: net_id,
                phone: phone,
                data_plan: api_id,
                bypass: false,
                'request-id': uuid
            }
            const response = await axios.post(`${API_URL}/api/data`, requestBody, {
                headers: {
                    'Authorization': `${API_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            });

            // res.json(response.data)
            let { message, status } = response.data
            message= message.split(" ")[0]

            if(message=="Insufficient"){
                message="Contact Admin for support";
            }


            //{
            //     "network": "MTN",
            //     "request-id": "Data_1234567890",
            //     "amount": "100",
            //     "dataplan": "500MB",
            //     "status": "success",
            //     "message": "Yello! You have gifted 500MB to 2347013397088. Share link https://mtnapp.page.link/myMTNNGApp with 2347013397088 to download the new MyMTN app for exciting offers.",
            //     "phone_number": "07013397088",
            //     "oldbal": "110325",
            //     "newbal": 110225,
            //     "system": "API",
            //     "plan_type": "GIFTING",
            //     "wallet_vending": "wallet"
            // }

            //            const { price_label, data_name, data_volume, phone, profit, price } = req.body;
            const date = new Date();
            let webhook_url = await creditor.getWebHook(username);
            if (!webhook_url) {
                webhook_url = null
            }
            //  console.log(webhook_url);

            const storeData = await myhelper.storeDataHistory(uuid, username, message, data_name, price_label, data_volume, phone, profit, price, status, date)
            const storeWallet = await myhelper.storeWalletHistory(uuid, username, message, price, prev_bal, parseInt(new_bal), status, date)
            res.json(response.data);
            //res.json({ status: "success", message: 'called the api endpoint successfully for data' })

        } catch (err) {
            if (err.response) {
                res.json(err.response.data);
                creditor.creditUser(req.session.username, req.body.price)

            } else {
                console.log(err.message);

            }

        }

    }

    async getCable(req, res) {

        try {

            uuid = require('uuid').v4();


            const { cable_name, cable_plan, iuc, name, price, username, api_id, cable_id, prev_bal, new_bal } = req.body

            let API_URL, API_TOKEN

            switch (req.body.api) {
                case 'api1':
                    API_URL = `${process.env.API_URL1}`
                    API_TOKEN = `${process.env.API_TOKEN1}`
                    break;

                case 'api2':
                    API_URL = `${process.env.API_URL2}`
                    API_TOKEN = `${process.env.API_TOKEN2}`
                    break;

                case 'api3':
                    API_URL = `${process.env.API_URL3}`
                    API_TOKEN = `${process.env.API_TOKEN3}`
                    break;

            }

            const requestBody = {
                cable: cable_id,
                iuc: iuc,
                cable_plan: api_id,
                bypass: false,
                'request-id': uuid
            }


            const response = await axios.post(`${API_URL}/api/cable`, requestBody, {
                headers: {
                    'Authorization': `${API_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            });

            let { message, status } = response.data
               message= message.split(" ")[0]

            if(message=="Insufficient"){
                message="Contact Admin for support";
            }


            //{

            //     "cable_name": "DSTV",
            //     "request-id": "Cable_1234567890",
            //     "amount": "12000",
            //     "charges": 6000,
            //     "status": "success",
            //     "message": "successfully purchase DSTV joli joli ₦12000 to 0701339708866",
            //     "iuc": "0701339708866",
            //     "oldbal": "110128",
            //     "newbal": 92128,
            //     "system": "API",
            //     "wallet_vending": "wallet",
            //     "plan_name": "joli joli"
            // }
            const date = new Date();

            const storeCable = await myhelper.storeCableHistory(uuid, username, message, cable_name, cable_plan, iuc, name, price, status, date)
            const storeWallet = await myhelper.storeWalletHistory(uuid, username, message, price, prev_bal, new_bal, status, date)

            // res.json({ status: "success", message: 'called the api endpoint successfully for cableTV' })
            res.json(response.data)

        } catch (err) {
            if (err.response) {
                creditor.creditUser(req.session.username, req.body.price)
                res.json(err.response.data)

            } else {
                console.log(err.message)

            }

        }




    }

    async getAirtime(req, res) {

        try {

            uuid = require('uuid').v4();
            let API_URL, API_TOKEN
            const { airtime_name, phone, net_id, prev_bal, new_bal, amount, charge, username } = req.body

            switch (req.body.api) {
                case 'api1':
                    API_URL = `${process.env.API_URL1}`
                    API_TOKEN = `${process.env.API_TOKEN1}`
                    break;

                case 'api2':
                    API_URL = `${process.env.API_URL2}`
                    API_TOKEN = `${process.env.API_TOKEN2}`
                    break;

                case 'api3':
                    API_URL = `${process.env.API_URL3}`
                    API_TOKEN = `${process.env.API_TOKEN3}`
                    break;

            }

            const requestBody = {
                network: net_id,
                phone: phone,
                plan_type: 'VTU',
                amount: amount,
                bypass: false,
                'request-id': uuid
            }

            const response = await axios.post(`${API_URL}/api/topup`, requestBody, {
                headers: {
                    'Authorization': `${API_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            });

            let { message, status } = response.data
message= message.split(" ")[0]

            if(message=="Insufficient"){
                message="Contact Admin for support";
            }


            // {
            //     "network": "MTN",
            //     "request-id": "Airtime_1234567890",
            //     "amount": 100,
            //     "discount": 97,
            //     "status": "success",
            //     "message": "successfully purchase MTN VTU to 07013397088 , ₦100",
            //     "phone_number": "07013397088",
            //     "oldbal": "110225",
            //     "newbal": 110128,
            //     "system": "API",
            //     "plan_type": "VTU",
            //     "wallet_vending": "wallet"
            // }
            const date = new Date();

            const storeAirtime = await myhelper.storeAirtimeHistory(uuid, username, message, airtime_name, phone, amount, status, date)
            const storeWallet = await myhelper.storeWalletHistory(uuid, username, message, charge, prev_bal, new_bal, status, date)
            // res.json({ status: "success", message: 'called the api endpoint successfully for airtime' })
            // console.log({ success: 'called the api endpoint successfully' })

            res.json(response.data);

        } catch (err) {
            if (err.response) {
                creditor.creditUser(req.session.username, req.body.charge)
                res.json(err.response.data)

            } else {
                console.log(err.message)

            }

        }



    }

    async getBill(req, res) {

        try {



            uuid = require('uuid').v4();
            const { username, meter_type, meter_number, mycharge, prev_bal, new_bal, amount, api_id, name } = req.body
            let API_URL, API_TOKEN

            switch (req.body.api) {
                case 'api1':
                    API_URL = `${process.env.API_URL1}`
                    API_TOKEN = `${process.env.API_TOKEN1}`
                    break;

                case 'api2':
                    API_URL = `${process.env.API_URL2}`
                    API_TOKEN = `${process.env.API_TOKEN2}`
                    break;

                case 'api3':
                    API_URL = `${process.env.API_URL3}`
                    API_TOKEN = `${process.env.API_TOKEN3}`
                    break;

            }

            const requestBody = {
                disco: api_id,
                meter_type: meter_type,
                meter_number: meter_number,
                amount: 100,
                bypass: false,
                'request-id': uuid
            }

            const response = await axios.post(`${API_URL}/api/bill`, requestBody, {
                headers: {
                    'Authorization': `${API_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            });

            let { message, disco_name, token, status } = response.data;

message= message.split(" ")[0]

            if(message=="Insufficient"){
                message="Contact Admin for support";
            }


            // {
            //     "disco_name": "ADEX DISO",
            //     "request-id": "Bill_1234567890",
            //     "amount": 300,
            //     "charges": 21,
            //     "status": "success",
            //     "message": "Transaction  successful ADEX DISO PREPAID ₦300 to 0701339708866",
            //     "meter_number": "0701339708866",
            //     "meter_type": "POSTPAID",
            //     "oldbal": "92128",
            //     "newbal": 91807,
            //     "system": "API",
            //     "token": "******",
            //     "wallet_vending": "wallet"
            // }
            //const { biller_name,phone } = req.body
            const date = new Date()
            const storeBill = myhelper.storeBillHistory(uuid, username, message, disco_name, meter_type, meter_number, name, amount, token, status, date);
            const storeWallet = await myhelper.storeWalletHistory(uuid, username, message, mycharge, prev_bal, new_bal, status, date)
            //  res.json({ status: "success", message: 'called the api endpoint successfully for bill' })

            res.json(response.data)

        } catch (err) {
            if (err.response) {
                creditor.creditUser(req.session.username, req.body.mycharge)
                res.json(err.response.data)

            } else {
                console.log(err.message)

            }

        }
    }

    async getExam(req, res) {

        try {

            let API_URL, API_TOKEN
            uuid = require('uuid').v4();
            const { exam_name, price, api_id, username, prev_bal, new_bal } = req.body

            switch (req.body.api) {
                case 'api1':
                    API_URL = `${process.env.API_URL1}`
                    API_TOKEN = `${process.env.API_TOKEN1}`
                    break;

                case 'api2':
                    API_URL = `${process.env.API_URL2}`
                    API_TOKEN = `${process.env.API_TOKEN2}`
                    break;

                case 'api3':
                    API_URL = `${process.env.API_URL3}`
                    API_TOKEN = `${process.env.API_TOKEN3}`
                    break;

            }

            const requestBody = {
                exam: api_id,
                quantity: 1,
                "request-id": uuid
            }

            const response = await axios.post(`${API_URL}/api/exam`, requestBody, {
                headers: {
                    'Authorization': `${API_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            });

            let { message, pin, quantity, status } = response.data

           message= message.split(" ")[0]

            if(message=="Insufficient"){
                message="Contact Admin for support";
            }

            
            // {
            //     "username": "adex",
            //     "amount": 100,
            //     "quantity": 1,
            //     "message": "WAEC Exam Pin Generated",
            //     "oldbal": "91807",
            //     "newbal": 91807,
            //     "date": "2022-09-08 03:58:27",
            //     "status": "success",
            //     "request-id": "RESULTCHECKER_63195a53157b3",
            //     "pin": " pin1<=>seral1"
            // }
            // const date = new Date();
            const StoreExam = await myhelper.storeExam(uuid, username, message, exam_name, quantity, price, pin, status, date)
            const storeWallet = await myhelper.storeWalletHistory(uuid, username, message, price, prev_bal, new_bal, status, date)
           // res.json({ status: "success", message: 'called the api endpoint successfully for exam pin' })

           res.json(response.data);

        } catch (err) {
            if (err.response) {
                creditor.creditUser(req.session.username, req.body.price)

                res.json(err.response.data)

            } else {
                console.log(err.message)

            }

        }



    }

    async getSms(req, res) {


        try {

            let API_URL, API_TOKEN;
            uuid = require('uuid').v4();

            let { subject, numbers, body, username, charge, prev_bal, new_bal } = req.body

            switch (req.body.api) {
                case 'api1':
                    API_URL = `${process.env.API_URL1}`
                    API_TOKEN = `${process.env.API_TOKEN1}`
                    break;

                case 'api2':
                    API_URL = `${process.env.API_URL2}`
                    API_TOKEN = `${process.env.API_TOKEN2}`
                    break;

                case 'api3':
                    API_URL = `${process.env.API_URL3}`
                    API_TOKEN = `${process.env.API_TOKEN3}`
                    break;

            }

            const requestBody = {
                sender: subject,
                number: numbers,
                message: body,

            }
                const response = await axios.post(`${API_URL}/api/bulksms`, requestBody, {
                headers: {
                    'Authorization': `${API_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            });
            
            let { message, total_number, total_correct_number, total_wrong_number, status } =response.data 
            
            message= message.split(" ")[0]

            if(message=="Insufficient"){
                message="Contact Admin for support";
            }



            // {
            //     "amount": 100,
            //     "newbal": 91607,
            //     "oldbal": "91707",
            //     "plan_date": "2022-09-08 04:10:58",
            //     "request-id": "BULKSMS_63195d3fcf35b",
            //     "status": "success",
            //     "correct_number": "07013397088",
            //     "wrong_number": "",
            //     "total_number": 1,
            //     "total_correct_number": 1,
            //     "total_wrong_number": 1,
            //     "message": "messages sent to 1 phone numbers",
            //     "sender_name": "API",
            //     "numbers": "07013397088"
            // }


            let amount
            if (total_wrong_number > 0) {
                amount = req.body.amount - total_wrong_number * charge;
                new_bal = req.body.new_bal + total_wrong_number * charge;
                creditor.creditUser(username, total_wrong_number * charge)
            } else {
                amount = req.body.amount

            }
            const date = new Date()

            const storeSms = await myhelper.storeSmsHistory(uuid, username, message, subject, amount, total_number, total_correct_number, total_wrong_number, status, date)
            const storeWallet = await myhelper.storeWalletHistory(uuid, username, message, amount, prev_bal, new_bal, status, date)
            //res.json({ status: "success", message: 'called the api endpoint successfully for bulk sms' })
            res.json(response.data);

        } catch (err) {
            if (err.response) {
                creditor.creditUser(req.session.username, req.body.amount)
                res.json(err.response.data)

            } else {
                console.log(err.message)

            }

        }


    }

    async validateIuc(req, res) {

        try {
            const { iuc, cable_id } = req.body
            let API_URL, API_TOKEN

            switch (req.body.api) {
                case 'api1':
                    API_URL = `${process.env.API_URL1}`
                    API_TOKEN = `${process.env.API_TOKEN1}`
                    break;

                case 'api2':
                    API_URL = `${process.env.API_URL2}`
                    API_TOKEN = `${process.env.API_TOKEN2}`
                    break;

                case 'api3':
                    API_URL = `${process.env.API_URL3}`
                    API_TOKEN = `${process.env.API_TOKEN3}`
                    break;

            }

            const response = await axios.get(`${API_URL}/api/cable/cable-validation?iuc=${iuc}&cable=${cable_id}`);

            res.json(response.data)
            
        } catch (err) {

            if (err.response) {
                res.json(err.response.data)

            } else {
                console.log(err.message)

            }

        }


    }

    async validateMeter(req, res) {
        try {
            const { meter_number, api_id, meter_type } = req.body;
            switch (req.body.api) {
                case 'api1':
                    API_URL = `${process.env.API_URL1}`
                    API_TOKEN = `${process.env.API_TOKEN1}`
                    break;

                case 'api2':
                    API_URL = `${process.env.API_URL2}`
                    API_TOKEN = `${process.env.API_TOKEN2}`
                    break;

                case 'api3':
                    API_URL = `${process.env.API_URL3}`
                    API_TOKEN = `${process.env.API_TOKEN3}`
                    break;
            }

            const response = await axios.get(`${API_URL}/api/bill/bill-validation?meter_number=${meter_number}&disco=${api_id}&meter_type=${meter_type}`);

            res.json(response.data)
        } catch (err) {
            if (err.response) {
                res.json(err.response.data)

            } else {
                console.log(err.message)

            }
        }


    }


}
module.exports = apis


