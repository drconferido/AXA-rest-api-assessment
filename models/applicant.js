const mongoose = require('mongoose')

const applicantSchema = new mongoose.Schema({
    

Name:{
    type: String,
    required: true
},
Email:{
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
},
Mobile:{
    type: String,
    required: true
},
positionApplied:{
    type: String,
    required: true
},
Source:{
    type: String,
    required: true
}

})

module.exports = mongoose.model('Applicant', applicantSchema)