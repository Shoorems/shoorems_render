const cable_name = require('../models/cable_name_setting_model')
class cable_name_setting_controller {
  async getCableNameSetting(req, res) {
    try {
      const result = await cable_name.find({}, { _id: 0, __v: 0 })
      res.json(result)

    } catch (err) {
      console.log(err)
    }
  }
  async storeCableNameSetting(req, res) {
    try {
      const result = await cable_name.deleteMany({});
      if (result) {
        const response = await cable_name.insertMany(req.body);
      //  console.log(response)
      }
    } catch (err) {
      console.log(err)
    }

  }
}
module.exports = cable_name_setting_controller;

