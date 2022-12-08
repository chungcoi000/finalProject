const mongoose = require('mongoose');
// const RoleModel = require("./role.model");
// const DateModel = require("./date.model");
// const SlotModel = require("./slot.model");
// const UnitModel = require("./unit.model");
// const UserModel = require("./user.model");
// const bcrypt = require("bcrypt");

mongoose.connect('mongodb://localhost:27017', async () => {
  console.log("Connect to database successful");
  // await RoleModel.findOneAndUpdate({name: 'teacher'}, {name: 'teacher'}, {new: true, upsert: true, setOnInsert: true})
  // await RoleModel.findOneAndUpdate({name: 'student'}, {name: 'student'}, {new: true, upsert: true, setOnInsert: true})
  // await RoleModel.findOneAndUpdate({name: 'parent'}, {name: 'parent'}, {new: true, upsert: true, setOnInsert: true})
  // await RoleModel.findOneAndUpdate({name: 'admin'}, {name: 'admin'}, {new: true, upsert: true, setOnInsert: true})
  //
  // await DateModel.findOneAndUpdate({name: 'Monday', index: 0}, {name: 'Monday', index: 0}, {
  //   new: true,
  //   upsert: true,
  //   setOnInsert: true
  // })
  // await DateModel.findOneAndUpdate({name: 'Tuesday', index: 1}, {name: 'Tuesday', index: 1}, {
  //   new: true,
  //   upsert: true,
  //   setOnInsert: true
  // })
  // await DateModel.findOneAndUpdate({name: 'Wednesday', index: 2}, {name: 'Wednesday', index: 2}, {
  //   new: true,
  //   upsert: true,
  //   setOnInsert: true
  // })
  // await DateModel.findOneAndUpdate({name: 'Thursday', index: 3}, {name: 'Thursday', index: 3}, {
  //   new: true,
  //   upsert: true,
  //   setOnInsert: true
  // })
  // await DateModel.findOneAndUpdate({name: 'Friday', index: 4}, {name: 'Friday', index: 4}, {
  //   new: true,
  //   upsert: true,
  //   setOnInsert: true
  // })
  // await DateModel.findOneAndUpdate({name: 'Saturday', index: 5}, {name: 'Saturday', index: 5}, {
  //   new: true,
  //   upsert: true,
  //   setOnInsert: true
  // })
  //
  // await SlotModel.findOneAndUpdate({slot: '1', startDate: '7h15', endDate: "8h"}, {
  //   slot: '1',
  //   startDate: '7h15',
  //   endDate: "8h"
  // }, {new: true, upsert: true, setOnInsert: true})
  // await SlotModel.findOneAndUpdate({slot: '2', startDate: '8h10', endDate: "8h55"}, {
  //   slot: '2',
  //   startDate: '8h10',
  //   endDate: "8h55"
  // }, {new: true, upsert: true, setOnInsert: true})
  // await SlotModel.findOneAndUpdate({slot: '3', startDate: '9h5', endDate: "9h50"}, {
  //   slot: '3',
  //   startDate: '9h5',
  //   endDate: "9h50"
  // }, {new: true, upsert: true, setOnInsert: true})
  // await SlotModel.findOneAndUpdate({slot: '4', startDate: '10h', endDate: "10h45"}, {
  //   slot: '4',
  //   startDate: '10h',
  //   endDate: "10h45"
  // }, {new: true, upsert: true, setOnInsert: true})
  // await SlotModel.findOneAndUpdate({slot: '5', startDate: '10h55', endDate: "11h30"}, {
  //   slot: '5',
  //   startDate: '10h55',
  //   endDate: "11h30"
  // }, {new: true, upsert: true, setOnInsert: true})
  //
  // await UnitModel.findOneAndUpdate({name: 10}, {name: 10}, {new: true, upsert: true, setOnInsert: true})
  // await UnitModel.findOneAndUpdate({name: 11}, {name: 11}, {new: true, upsert: true, setOnInsert: true})
  // await UnitModel.findOneAndUpdate({name: 12}, {name: 12}, {new: true, upsert: true, setOnInsert: true})
  //
  // await UserModel.findOneAndUpdate({
  //   name: "Admin",
  //   email: "admin@gmail.com",
  //   password: "admin@123",
  //   role: "admin"
  // }, {
  //   name: "Admin",
  //   email: "admin@gmail.com",
  //   password: "admin@123",
  //   role: "admin"
  // }, {
  //   new: true,
  //   upsert: true,
  //   setOnInsert: true
  // })
});
// mongoose.connect('mongodb+srv://chungcoi000:kanekiken113@cluster0.quvmg.mongodb.net/final_project?retryWrites=true&w=majority', async () => {
//   console.log("Connect to database successful")
// })

module.exports = mongoose;