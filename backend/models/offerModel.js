import mongoose from 'mongoose'

const offerSchema=mongoose.Schema(
    {  name:{
            type:String,
            required:true,
       },
       discount:{
           type:String,
           required:true,
       },
       category:{
        type:String,
        // required:true,
  
       }
    },{
        timestamps: true
    }
)

const Offer=mongoose.model('Offer',offerSchema)
export default Offer