const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullname: {type: String},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 5 },
  role: { type: String },
  id: {type: String},
  education: {type: String},
  photo : {type: String},
  fatherName: {type: String},
  motherNamne: {type: String},
  currentAddress: {type: String},
  fullAddress: {type: String},
  pincode: {type: String},
  currentPincode: {type: String},
  dob: {type: String},
  studentsPhone: {type: Number},
  fatherPhone: {type: Number},
  previouseducation: {type: String},
  height: {type: Number},
  weight:  {type: Number},
  adhaarCard: {type: Number},
  leavingCertificate: {type: String},
  result : {type: String},
  proofOfIncome: {type: String},
  employeed: [{
    companyname:{type: String},
    address: {type: String},
    workingHours:{type: String},
  }],
});


// Define a static method on the schema
userSchema.statics.updateUserById = async function (userId, updatedData) {
  try {
    // Find the user by ID and update the data
    const user = await this.findByIdAndUpdate(userId, updatedData, { new: true });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = User = mongoose.model("user", userSchema);

