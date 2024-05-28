//const express=require('express');
const airtime_plan = require('../models/airtime_plan_setting_model')
class airtime_plan_setting_controller {
  async getAirtimePlanSetting(req, res) {
   // console.log(req.query);
    try {
      const result = await airtime_plan.find({package:req.query.package,airtime_name:req.query.airtime_name}, { _id: 0, __v: 0 })
      res.json(result)
      //console.log(result)
      //console.log(result)

    } catch (err) {
      console.log(err)
    }
  }
  async storeAirtimePlanSetting(req, res) {
   //console.log(req.body)
       
     try {
      const result = await airtime_plan.deleteMany({airtime_name:req.body.airtime_name, package:req.body.package});
      if (result) {
        const response = await airtime_plan.create(req.body);
       // console.log(response)
      }
    } catch (err) {
      console.log(err)
    }

  }
}
module.exports = airtime_plan_setting_controller;

