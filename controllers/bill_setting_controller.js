const myModel = require('../models/bill_setting_model')
class bill_setting_controller {
  async getBillSetting(req, res) {
    try {
      const result = await myModel.find({}, { _id: 0, __v: 0 })
      res.json(result)

    } catch (err) {
      console.log(err)
    }
  }
  async storeBillRecord(req, res) {
   // console.log(req.body)
    try {
      const result = await myModel.deleteMany({});
      if (result) {
        const response = await myModel.insertMany(req.body);
    //    console.log(response)
      }
    } catch (err) {
      console.log(err)
    }

  }
}
module.exports = bill_setting_controller

