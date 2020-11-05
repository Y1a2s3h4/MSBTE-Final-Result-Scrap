const mongoose = require("mongoose");
const FinalSchema = new mongoose.Schema({
  NameOfStudent: String,
  EnrollmentNo: String,
  FinalSemPer: String,
  Aggregate: String,
});
module.exports = mongoose.model("FinalPercentageSchema", FinalSchema);
