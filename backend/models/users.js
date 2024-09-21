const mongoose = require('mongoose');

// Define the Regulation schema
const UsersSchema = new mongoose.Schema({
    userId : {type:Number , required: true, default: 1},
    username: { type: String, required: true, unique: true , default:"admin123"},
    password: { type: String,required: true ,default:"admin123"},

}, { timestamps: true });

// Create and export the Regulation model
module.exports = mongoose.model('Users', UsersSchema);
