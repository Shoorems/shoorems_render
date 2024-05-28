const data_name = require('../models/data_name_setting_model')
class data_name_setting_controller {
  async getDataNameSetting(req, res) {
    try {
      const result = await data_name.find({}, { _id: 0, __v: 0 })
      res.json(result)

    } catch (err) {
      console.log(err)
    }
  }
  async storeDataNameSetting(req, res) {
    try {
      const result = await data_name.deleteMany({});
      if (result) {
        const response = await data_name.insertMany(req.body);
        console.log(response)
      }
    } catch (err) {
      console.log(err)
    }

  }
}
module.exports = data_name_setting_controller;

