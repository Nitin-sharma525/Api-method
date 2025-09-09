const mongoose = require('mongoose'); // require mongoose
const userSchema = new mongoose.Schema({ //user Schema
    uc_uuid:{type:String},
    uc_username:{type:String,require:true},
    uc_email:{type:String,require:true},
    uc_phone:{type:String},
    uc_password:{type:String}
})

const User  = mongoose.model('user',userSchema);
 module.exports = User;