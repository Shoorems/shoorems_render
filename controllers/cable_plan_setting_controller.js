//const express=require('express');
const cable_plan = require('../models/cable_plan_setting_model')
class cable_plan_setting_controller {
  async getCablePlanSetting(req, res) {
    try {
      const result = await cable_plan.find({package:req.query.package,cable_name:req.query.cable_name}, { _id: 0, __v: 0 })
      res.json(result)

    } catch (err) {
      console.log(err)
    }
  }
  
  async storeCablePlanSetting(req, res) {
const arr=req.body.formData2
const newArr= arr.map((item)=>{return {...item,package:req.body.package,cable_name:req.body.cable_name}});
   
    
     try {
      const result = await cable_plan.deleteMany({cable_name:req.body.cable_name,package:req.body.package});
      if (result) {
        const response = await cable_plan.create(newArr);
       // console.log(response)
      }
    } catch (err) {
      console.log(err)
    }

  }
}
module.exports = cable_plan_setting_controller;

