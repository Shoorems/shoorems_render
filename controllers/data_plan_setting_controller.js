//const express=require('express');
const data_plan = require('../models/data_plan_setting_model')
class data_Plan_setting_controller {
  async getDataPlanSetting(req, res) {
    
    try {
      const result = await data_plan.find({package:req.query.package,data_name:req.query.data_name}, { _id: 0, __v: 0 })
      res.json(result)

    } catch (err) {
      console.log(err)
    }
  }
  async storeDataPlanSetting(req, res) {
const arr=req.body.formData2
const newArr= arr.map((item)=>{return {...item,package:req.body.package,data_name:req.body.data_name}});
   
    
     try {
      const result = await data_plan.deleteMany({data_name:req.body.data_name,package:req.body.package});
      if (result) {
        const response = await data_plan.create(newArr);
        console.log(response)
      }
    } catch (err) {
      console.log(err)
    }

  }
}
module.exports = data_Plan_setting_controller;

