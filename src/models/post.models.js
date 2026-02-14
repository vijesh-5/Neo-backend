import mongoose , {Schema} from "mongoose";

const postSchema = new Schema(
    {
        name:{
            type:String,
            required:true,
            trim :true,
            minLength:2,
            maxLength:20
        },
        description:{
            type:String,
            required:true,
            trim :true,
            minLength:2,
            maxLength:200
        },
        age:{
            type:Number,
            required: true,
            min: 1,
            max: 150
        }

    },
    {
        timestamps: true
    }
);

export const Post = mongoose.model('Post' , postSchema);