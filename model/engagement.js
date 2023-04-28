import mongoose, { mongo } from "mongoose";
import today from "../date.js"

const engagementSchema = ({
   
  propertyId :{
    type :mongoose.Schema.Types.ObjectId,
    ref : "property"
  },
  
  visitedUser:[{
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    date:{
      type:String,
      required:true,
      default : today
    }
  }],

  houseVisitCount :{
     type : Number,
     required:true
   },
  date:{
     type:String,
     required:true,
     default : today
  }

});

export const Engagement = mongoose.model("engagement",engagementSchema);