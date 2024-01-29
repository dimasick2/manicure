const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userScheme = new Schema({
    email: {
        type: String,
        require:true
        
    },
    password: {
        type: String,
        
    },
    token: {
        type: String,
        
    }
   

});
module.exports = mongoose.model("users", userScheme);