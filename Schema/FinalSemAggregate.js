const mongoose = require("mongoose");
const FinalAggregateSchema = new mongoose.Schema({
  NameOfStudent: String,
  EnrollmentNo: String,
  FinalSemPer: String,
  Aggregate: String,
});
module.exports = mongoose.model("FinalAggregateSchema", FinalAggregateSchema);
