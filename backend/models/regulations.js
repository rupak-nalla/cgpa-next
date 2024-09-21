const mongoose = require('mongoose');

// Define the Regulation schema
const RegulationSchema = new mongoose.Schema({

    name: { type: String, required: true, unique: true },
    description: { type: String },
    semesters: [{
        "semester":{ type: Number, required:true },
        "subjects":[{
            "subjectName":{ type:String, required: true },
            "credits": { type:Number, required: true},
        }]
    }] // Array of Semester references
}, { timestamps: true });

// Create and export the Regulation model
module.exports = mongoose.model('Regulation', RegulationSchema);
