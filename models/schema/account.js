const mongoose = require("mongoose");

module.exports = accountsSchema = new mongoose.Schema({
  first_name: String, // String is shorthand for {type: String}
  last_name: String,
  email: String,
  password: String,
  company: String,
  billing_email: String,
  country: String,
  timezone: String,
  status: Number,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});
