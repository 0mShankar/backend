const mongoose=require("mongoose");

const contactSchema=mongoose.Schema({
  user_id:{
     type:mongoose.Schema.Types.ObjectId,
     require:true
  },
      name:{
        type:String,
        require:[true,"Please add the contact"],
        ref:"User"
      },
      email:{
        type:String,
        require:[true,"Please add contact email address"],
      },
      phone:{
        type:String,
        require:[true,"Please add contact phone number"],
      }
    },
    {
        timestamps:true,
    })

    module.exports=mongoose.model("Contact",contactSchema);