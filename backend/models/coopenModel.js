import mongoose from 'mongoose'

const coopenSchema=mongoose.Schema(
    {  coopenName:{
            type:String,
            required:true,
       },
       coopenDiscount:{
           type:String,
           required:true,
       },
       category:{
        type:String,
        // required:true,
        default:'Badmintion'
  
       }
    },{
        timestamps: true
    }
)

const Coopen=mongoose.model('coopen',coopenSchema)
export default Coopen