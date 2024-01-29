const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userScheme = new Schema({
    email: {
        type: String,
        require:true
        
    },
    
    access: {
        type: String,
        
    }

});
module.exports = mongoose.model("lesson", userScheme);