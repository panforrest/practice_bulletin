var mongoose = require('mongoose')

var PostSchema = new mongoose.Schema({
    title:{type:String, trim:true, default:''},                    //type should not have quotation mark
    text:{type:String, trim:true, default:''},
    community:{type:String, trim:true, default:''},
    profile:{type:String, trim:true, default:''},
    timestamp:{type:String, trim:true, default:''}
    
})

PostSchema.methods.summary = function(){     //There should be no variable for function
    var summary = {
        title: this.title,
        text: this.text,
        community: this.community,
        profile: this.profile,
        timestamp: this.timestamp
    }
 
    return summary
}

module.exports = mongoose.model('PostSchema', PostSchema)
