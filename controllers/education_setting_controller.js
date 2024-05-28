const myModel = require('../models/edu_setting_model')
class edu_setting_controller {
  async getSetting(req, res) {
    try {
      const result = await myModel.find({}, { _id: 0, __v: 0 })
      res.json(result)

    } catch (err) {
      console.log(err)
    }
  }
  async storeRecord(req, res) {
    try {
      const result = await myModel.deleteMany({});
      if (result) {
        const response = await myModel.insertMany(req.body);
       // console.log(response)
      }
    } catch (err) {
      console.log(err)
    }

  }
}
module.exports = edu_setting_controller;

