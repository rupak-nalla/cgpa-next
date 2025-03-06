const mongoose = require('mongoose');

// Define the Regulation schema
const RegulationSchema = new mongoose.Schema({

    name: { type: String, required: true, unique: true },
    description: { type: String },
    branches:[
                {
                    "branch_name" : { type:String ,required:true, default :"CSE" },
                    "semesters" : [{
                        "semester":{ type: Number, required:true },
                        "subjects":[{
                            "subjectName":{ type:String, required: true },
                            "credits": { type:Number, required: true},
                            }]
                    }],
                }
            ]
    
    }, { timestamps: true });

// Create and export the Regulation model
module.exports = mongoose.model('Regulation', RegulationSchema);
