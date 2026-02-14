import { Post } from "../models/post.models.js";

const createPost = async (req , res ) => {
    try{
        const {name , description , age} = req.body;

        if(!name || !description || !age){
            return res.status(400).json({message : "Incomplete fields !! "})
        }

        const post = await Post.create({name , description  , age});
        return res.status(201).json({message : "Successfully created an post" , post});

    }catch (error){
        res.status(500).json({message:"Internal Server Error"});
    }
}

// read all posts 
const getAllPosts = async(req , res) =>{
    try{
        const posts = await Post.find().select("-_id name description age");

        res.status(200).json({posts});
    }catch (error){
        res.status(500).json({message:"Internal Server Error !!" , error: error.message});
    }
}

const deletePost = async (req , res) => {
    try{
        console.log(req.body);
        // const {name} = req.body;
        // const post = await Post.findOneAndDelete({name:name});
        // if(!post) return res.status(404).json({message:"Post not found !"}); 
        // res.json(200).json({message: "Sucessfully deleted " , post})

        const name = req.body?.name;

        if(!name) return res.status(400).json({
            message:"Name Required "
        });

        const post = await Post.findOneAndDelete({name});

        if(!post) return res.status(400).json({message:"Post not found "});

        return res.status(200).json({
            message: "Successfully deleted " , 
            post
        })

    }catch (error){
        res.status(500).json({message : "Internal Server Error" , error: error.message});
    }
}

const deletePostById = async (req , res ) => {
    try{
        const post = await Post.findByIdAndDelete(req.params.id);
        if(!post) return res.status(400).json({message:"Post not found "});
        return res.status(200).json({
            message: "Successfully deleted " , 
            post
        })
    }catch (error){
        res.status(500).json({message : "Internal Server Error" , error: error.message});
    }
}

const updatePost = async (req , res) => {
    try{
        if(Object.keys(req.body).length === 0){
            return res.status(400).json({message:"Incomplete data !!"});
        }
        const post = await Post.findByIdAndUpdate(
            req.params.id , req.body , {new : true}
        );

        if (!post){
            return res.status(400).json({message:"Post not found"});
        }
        return res.status(200).json({message: "Post Updated Successfully", post});
    }catch(error){
        res.status(500).json({message:"Internal Server Error !!" , error: error.message});
    }
}
export {createPost , getAllPosts , deletePost , deletePostById ,  updatePost};