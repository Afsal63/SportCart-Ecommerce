import mongoose from 'mongoose'

const coopenSchema=mongoose.Schema(
    {  coopenName:{
            type:String,
            required:true,
       },
       coopenDiscount:{
           type:Number,
           required:true,
       },
       category:{
        type:String,
        // required:true,
        default:'Badmintion'
  
       },
       isApplyed:{
           type:Boolean,
           default:false,
           required:true
       }
    },{
        timestamps: true
    }
)

const Coopen=mongoose.model('coopen',coopenSchema)
export default Coopen