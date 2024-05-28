const airtime_name = require('../models/airtime_name_setting_model')
class airtime_name_setting_controller {
  async getAirtimeNameSetting(req, res) {
    try {
      const result = await airtime_name.find({}, { _id: 0, __v: 0 })
      res.json(result)

    } catch (err) {
      console.log(err)
    }
  }
  async storeAirtimeNameSetting(req, res) {
    try {
      const result = await airtime_name.deleteMany({});
      if (result) {
        const response = await airtime_name.insertMany(req.body);
       // console.log(response)
      }
    } catch (err) {
      console.log(err)
    }

  }
}
module.exports = airtime_name_setting_controller;

