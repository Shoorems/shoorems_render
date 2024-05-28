const express = require('express');
const router = express.Router()
require('dotenv').config();
const axios = require('axios');
const uuid = require('uuid').v4();
const data_plan = require('../models/dataHistoryModel');
const users = require('../models/users');
const airtime = require('../models/airtimeHistoryModel');
const cable = require('../models/cableHistoryModel');
const bill = require('../models/billHistoryModel');
const wallet = require('../models/walletHistoryModel');
const exam = require('../models/resultCheckerHistoryModel');
const sms = require('../models/smsHistoryModel');
const bank = require('../models/bankModel');

const getRequest = async (req, res, next) => {
    
    
    try {
        const { parameter } = req.params;
        if (parameter === "profit1") {

            const today = new Date();
            today.setHours(0, 0, 0, 0); // Set hours to beginning of the day for accurate comparison

            // Set end date for today
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1); // Set to tomorrow

            // Find transactions within today

            const result = await data_plan.aggregate([
                {
                    $match: { date: { $gte: today, $lt: tomorrow } }
                },

                {

                    $group: {
                        _id: "$data_name",
                        totalProfit: { $sum: "$profit" }
                    }
                }
            ])
            const newResult = result.map(item => item.totalProfit)
            res.json(newResult);


        }
        if (parameter === "profit2") {

            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
            oneWeekAgo.setHours(0, 0, 0, 0); // Set time to midnight

            // Calculate the date for the start of today
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Set time to midnight

            // Find transactions within today

            const result = await data_plan.aggregate([
                {
                    $match: { date: { $gte: oneWeekAgo, $lt: today } }
                },

                {

                    $group: {
                        _id: "$data_name",
                        totalProfit: { $sum: "$profit" }
                    }
                }
            ])
            const newResult = result.map(item => item.totalProfit)
            res.json(newResult);


        }
        if (parameter === "profit3") {

            const oneMonthAgo = new Date();
            oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
            oneMonthAgo.setHours(0, 0, 0, 0); // Set time to midnight

            // Calculate the date for the start of today
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Set time to midnight

            // Find transactions within today

            const result = await data_plan.aggregate([
                {
                    $match: { date: { $gte: oneMonthAgo, $lt: today } }
                },

                {

                    $group: {
                        _id: "$data_name",
                        totalProfit: { $sum: "$profit" }
                    }
                }
            ])
            const newResult = result.map(item => item.totalProfit)
            res.json(newResult);


        }
        if (parameter === "totalbalance") {
            const result = await users.aggregate([
                {
                    $group: {
                        _id: null,
                        totalProfit: { $sum: "$wallet" }
                    }
                }
            ])
            res.json(result[0]);
        }


        if (parameter === "volume1") {

            const today = new Date();
            today.setHours(0, 0, 0, 0); // Set hours to beginning of the day for accurate comparison

            // Set end date for today
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1); // Set to tomorrow

            // Find transactions within today

            const result = await data_plan.aggregate([
                {
                    $match: { date: { $gte: today, $lt: tomorrow } }
                },

                {

                    $group: {
                        _id: "$data_name",
                        totalProfit: { $sum: "$volume" }
                    }
                }
            ])
            const newResult = result.map(item => item.totalProfit)
            res.json(newResult);


        }
        if (parameter === "volume2") {

            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
            oneWeekAgo.setHours(0, 0, 0, 0); // Set time to midnight

            // Calculate the date for the start of today
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Set time to midnight

            // Find transactions within today

            const result = await data_plan.aggregate([
                {
                    $match: {date: { $gte: oneWeekAgo, $lt: today } }
                },

                {

                    $group: {
                        _id: "$data_name",
                        totalProfit: { $sum: "$volume" }
                    }
                }
            ])
            const newResult = result.map(item => item.totalProfit)
            res.json(newResult);


        }
        if (parameter === "volume3") {

            const oneMonthAgo = new Date();
            oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
            oneMonthAgo.setHours(0, 0, 0, 0); // Set time to midnight

            // Calculate the date for the start of today
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Set time to midnight

            // Find transactions within today

            const result = await data_plan.aggregate([
                {
                    $match: { date: { $gte: oneMonthAgo, $lt: today } }
                },

                {

                    $group: {
                        _id: "$data_name",
                        totalProfit: { $sum: "$volume" }
                    }
                }
            ])
            const newResult = result.map(item => item.totalProfit)
            res.json(newResult);


        }
        if (parameter === "label") {
            const result = await data_plan.aggregate([
                {
                    $group: {
                        _id: "$data_name"
                    }
                }
            ])
            const newResult = result.map(item => item._id)
            res.json(newResult);

        }
        if (parameter === "wallet") {
            const result = await users.aggregate([

                {

                    $group: {
                        _id: null,
                        wallet: { $sum: "$wallet" }
                    }
                }
            ])

            res.json(result[0]);

        }
        if (parameter === "user") {
            const result = await users.find({})
            res.json(result);

        }
        if (parameter === "general_service1") {
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Set hours to beginning of the day for accurate comparison

            // Set end date for today
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1); // Set to tomorrow

            // Find transactions within today

            let all = []
            const data = await data_plan.find({ date: { $gte: today, $lt: tomorrow } })
            const myairtime = await airtime.find({ date: { $gte: today, $lt: tomorrow } })
            const mybill = await bill.find({ date: { $gte: today, $lt: tomorrow } })
            const mycable = await cable.find({ date: { $gte: today, $lt: tomorrow } })
            const myexam = await exam.find({ date: { $gte: today, $lt: tomorrow } })
            const mysms = await sms.find({ date: { $gte: today, $lt: tomorrow } })
            all.push(data.length, myairtime.length, mybill.length, mycable.length, myexam.length, mysms.length)
            //            console.log(all)
            res.json(all)

        }
        if (parameter === "general_service2") {
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
            oneWeekAgo.setHours(0, 0, 0, 0); // Set time to midnight

            // Calculate the date for the start of today
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Set time to midnight

            // Find transactions within today

            let all = []
            const data = await data_plan.find({ date: { $gte: oneWeekAgo, $lt: today } })
            const myairtime = await airtime.find({ date: { $gte: oneWeekAgo, $lt: today } })
            const mybill = await bill.find({date: { $gte: oneWeekAgo, $lt: today } })
            const mycable = await cable.find({date: { $gte: oneWeekAgo, $lt: today } })
            const myexam = await exam.find({date: { $gte: oneWeekAgo, $lt: today } })
            const mysms = await sms.find({ date: { $gte: oneWeekAgo, $lt: today } })
            all.push(data.length, myairtime.length, mybill.length, mycable.length, myexam.length, mysms.length)
            //            console.log(all)
            res.json(all)

        }
        if (parameter === "general_service3") {
            const oneMonthAgo = new Date();
            oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
            oneMonthAgo.setHours(0, 0, 0, 0); // Set time to midnight

            // Calculate the date for the start of today
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Set time to midnight

            let all = []
            const data = await data_plan.find({date: { $gte: oneMonthAgo, $lt: today } })
            const myairtime = await airtime.find({date: { $gte: oneMonthAgo, $lt: today } })
            const mybill = await bill.find({ date: { $gte: oneMonthAgo, $lt: today } })
            const mycable = await cable.find({ date: { $gte: oneMonthAgo, $lt: today } })
            const myexam = await exam.find({ date: { $gte: oneMonthAgo, $lt: today } })
            const mysms = await sms.find({ date: { $gte: oneMonthAgo, $lt: today } })
            all.push(data.length, myairtime.length, mybill.length, mycable.length, myexam.length, mysms.length)
            //            console.log(all)
            res.json(all)

        }

        if (parameter === "totalusers") {
            const result = await users.find({})
            res.json({ totalUsers: result.length });

        }
        if (parameter === "totaltransaction") {
            const result = await wallet.find({})
            res.json({ total: result.length });

        }
        if (parameter === "dataHistory") {
            const result = await data_plan.find({})
            res.json(result);

        }
        if (parameter === "airtimeHistory") {
            const result = await airtime.find({}).sort({date:-1}).exec();
            res.json(result);

        }
        if (parameter === "billHistory") {
            const result = await bill.find({}).sort({date:-1}).exec();
            res.json(result);

        }
        if (parameter === "cableHistory") {
            const result = await cable.find({}).sort({date:-1}).exec();
            res.json(result);

        }
        if (parameter === "walletHistory") {
            const result = await wallet.find({}).sort({date:1}).exec();
            res.json(result);

        }
        if (parameter === "smsHistory") {
            const result = await sms.find({}).sort({date:-1}).exec();
            res.json(result);

        }
        if (parameter === "examHistory") {
            const result = await exam.find({}).sort({date:-1}).exec();
            res.json(result);

        }


    } catch (err) {
        console.log(err)

    }
}
const getRequest_user = async (req, res, next) => {
    // res.json({message:"successfully called the api"})
    try {
        const { parameter } = req.params;
       
        if (parameter === "volume1") {

            const today = new Date();
            today.setHours(0, 0, 0, 0); // Set hours to beginning of the day for accurate comparison

            // Set end date for today
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1); // Set to tomorrow

            // Find transactions within today

            const result = await data_plan.aggregate([
                {
                    $match: { username:req.session.username, date: { $gte: today, $lt: tomorrow } }
                },

                {

                    $group: {
                        _id: "$data_name",
                        totalProfit: { $sum: "$volume" }
                    }
                }
            ])
            const newResult = result.map(item => item.totalProfit)
            res.json(newResult);


        }
        if (parameter === "volume2") {

            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
            oneWeekAgo.setHours(0, 0, 0, 0); // Set time to midnight

            // Calculate the date for the start of today
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Set time to midnight

            // Find transactions within today

            const result = await data_plan.aggregate([
                {
                    $match: { username:req.session.username, date: { $gte: oneWeekAgo, $lt: today } }
                },

                {

                    $group: {
                        _id: "$data_name",
                        totalProfit: { $sum: "$volume" }
                    }
                }
            ])
            const newResult = result.map(item => item.totalProfit)
            res.json(newResult);


        }
        if (parameter === "volume3") {

            const oneMonthAgo = new Date();
            oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
            oneMonthAgo.setHours(0, 0, 0, 0); // Set time to midnight

            // Calculate the date for the start of today
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Set time to midnight

            // Find transactions within today

            const result = await data_plan.aggregate([
                {
                    $match: { username:req.session.username, date: { $gte: oneMonthAgo, $lt: today } }
                },

                {

                    $group: {
                        _id: "$data_name",
                        totalProfit: { $sum: "$volume" }
                    }
                }
            ])
            const newResult = result.map(item => item.totalProfit)
            res.json(newResult);


        }
        if (parameter === "label") {
        
            const result = await data_plan.aggregate([
                {
                    $match: { username:req.session.username }
                },
                {
                    $group: {
                        _id: "$data_name"
                    }
                }
            ])
            const newResult = result.map(item => item._id)
            res.json(newResult);

        }
        if (parameter === "providus") {
            const result = await bank.find({ username: req.session.username, bankName: "providus" })
            res.json(result[0]);

        }
        if (parameter === "paga") {
            const result = await bank.find({ username: req.session.username, bankName: "paga" })
            res.json(result[0]);

        }
        if (parameter === "safehaven") {
            const result = await bank.find({ username: req.session.username, bankName: "safehaven" })
            res.json(result[0]);

        }
        if (parameter === "user") {
            const result = await users.find({ username: req.session.username })
            res.json(result);

        }
        if (parameter === "balance") {
            const result = await users.findOne({ username:req.session.username })
            res.json({ balance: result.wallet });
           // console.log(req.session)

        }

        if (parameter === "dataHistory") {
            const result = await data_plan.find({ username:req.session.username }).sort({date:-1}).exec();
            res.json(result);

        }
        if (parameter === "airtimeHistory") {
            const result = await airtime.find({ username:req.session.username }).sort({date:-1}).exec();
            res.json(result);

        }
        if (parameter === "billHistory") {
            const result = await bill.find({ username:req.session.username }).sort({date:-1}).exec();
            res.json(result);

        }
        if (parameter === "cableHistory") {
            const result = await cable.find({ username:req.session.username }).sort({date:-1}).exec();
            res.json(result);

        }
        if (parameter === "walletHistory") {
            const result = await wallet.find({ username:req.session.username }).sort({date:1}).exec();
            res.json(result);

        }
        if (parameter === "smsHistory") {
            const result = await sms.find({ username:req.session.username }).sort({date:-1}).exec();
            res.json(result);

        }
        if (parameter === "examHistory") {
            const result = await exam.find({ username:req.session.username }).sort({date:-1}).exec();
            res.json(result);

        }
        if (parameter === "reseller") {
            const result = await users.findOne({ username:"Bashar123" })
           // console.log(result)
            res.json({reseller:result.reseller})

        }

        if (parameter === "general_service1") {
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Set hours to beginning of the day for accurate comparison

            // Set end date for today
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1); // Set to tomorrow

            // Find transactions within today

            let all = []
            const data = await data_plan.find({ username:req.session.username,date: { $gte: today, $lt: tomorrow } })
            const myairtime = await airtime.find({ username:req.session.username,date: { $gte: today, $lt: tomorrow } })
            const mybill = await bill.find({ username:req.session.username,date: { $gte: today, $lt: tomorrow } })
            const mycable = await cable.find({ username:req.session.username,date: { $gte: today, $lt: tomorrow } })
            const myexam = await exam.find({ username:req.session.username,date: { $gte: today, $lt: tomorrow } })
            const mysms = await sms.find({ username:req.session.username,date: { $gte: today, $lt: tomorrow } })
            all.push(data.length, myairtime.length, mybill.length, mycable.length, myexam.length, mysms.length)
            //            console.log(all)
            res.json(all)

        }
        if (parameter === "general_service2") {
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
            oneWeekAgo.setHours(0, 0, 0, 0); // Set time to midnight

            // Calculate the date for the start of today
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Set time to midnight

            // Find transactions within today

            let all = []
            const data = await data_plan.find({ username:req.session.username,date: { $gte: oneWeekAgo, $lt: today } })
            const myairtime = await airtime.find({ username:req.session.username,date: { $gte: oneWeekAgo, $lt: today } })
            const mybill = await bill.find({ username:req.session.username,date: { $gte: oneWeekAgo, $lt: today } })
            const mycable = await cable.find({ username:req.session.username,date: { $gte: oneWeekAgo, $lt: today } })
            const myexam = await exam.find({ username:req.session.username,date: { $gte: oneWeekAgo, $lt: today } })
            const mysms = await sms.find({ username:req.session.username,date: { $gte: oneWeekAgo, $lt: today } })
            all.push(data.length, myairtime.length, mybill.length, mycable.length, myexam.length, mysms.length)
            //            console.log(all)
            res.json(all)

        }
        if (parameter === "general_service3") {
            const oneMonthAgo = new Date();
            oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
            oneMonthAgo.setHours(0, 0, 0, 0); // Set time to midnight

            // Calculate the date for the start of today
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Set time to midnight

            let all = []
            const data = await data_plan.find({ username:req.session.username,date: { $gte: oneMonthAgo, $lt: today } })
            const myairtime = await airtime.find({ username:req.session.username,date: { $gte: oneMonthAgo, $lt: today } })
            const mybill = await bill.find({ username:req.session.username,date: { $gte: oneMonthAgo, $lt: today } })
            const mycable = await cable.find({ username:req.session.username,date: { $gte: oneMonthAgo, $lt: today } })
            const myexam = await exam.find({ username:req.session.username,date: { $gte: oneMonthAgo, $lt: today } })
            const mysms = await sms.find({ username:req.session.username,date: { $gte: oneMonthAgo, $lt: today } })
            all.push(data.length, myairtime.length, mybill.length, mycable.length, myexam.length, mysms.length)
            //            console.log(all)
            res.json(all)

        }

        if (parameter === "user_session") {
            if(!req.session.username){

                res.json({session:false})
            }else{

                res.json({session:true})

            }



        }



    } catch (err) {
        console.log(err)

    }
}
router.get('/getrequest/:parameter', getRequest)
router.get('/getrequestuser/:parameter', getRequest_user)

module.exports = router;
