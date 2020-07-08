//notes schema here
const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
	files:{
        type:mongoose.Schema.Types.Buffer,
        default:"no file"
    },
    note:{
        type:String,
        required:true
    },
    addedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userModel"
    },
    date:{
        type:Date,
        default:Date.now
    }
    
});

mongoose.model('noteModel',noteSchema)
