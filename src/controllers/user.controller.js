import { User } from "../models/user.models.js";

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //validate

    if (!username || !email || !password) {
      return res.status(400).json({ message: " All fields are important! " });
    }

    //preexsisting users
    let existing = await User.findOne({ email: email });

    if (existing) {
      return res
        .status(400)
        .json({ message: "user with the same email already exsists !" });
    }

    existing = await User.findOne({ username: username });
    if (existing) {
      return res.status(400).json({ message: "Username already exsists !" });
    }
    // let isValid = true;

    const userRegex = /^[a-zA-Z0-9_]{5,20}$/;
    if (!userRegex.test(username)) {
      // isValid = false;
      return res
        .status(400)
        .json({ message: "Improper user name please follow the norms !" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ message: "improper email pelease provide an proper email" });
    }

    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passRegex.test(password)) {
      return res
        .status(400)
        .json({ message: "Improper password please provide an proper one !" });
    }

    //create an user
    const user = await User.create({
      username,
      email,
      password,
      loggedIn: false,
    });

    res.status(201).json({
      message: "User registered Sucessfully",
      user: { id: user._id, email: user.email, username: user.username },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};


const loginUser = async (req , res) => {
    try{
        //wether user already exsists or not 
        const {email , password} = req.body;

        const user = await User.findOne({email: email});

        if(!user){
            return res.status(400)
            .json({
                message : "user not found "
            });
        }
        // checking password 
        const isMatch = await user.comparePassword(password);

        if(!isMatch) return res
        .status(400)
        .json({message : "Invalid credentials  " + isMatch});

        res.status(200).json({
            message: "User Logged in sucessfully",
            user:{
                id:user._id,
                username:user.username,
                email:user.email
            }
        });
    } catch (error){
        res.status(500).json({
            message:"Internal Server Error " ,
            error : error.message
        })
    }
}

const logoutUser = async (req , res) => {
    try{
      const {email} = req.body;
      const user = await User.findOne({email : email});
      if (!user){
        return res.status(400).json({message : "User not found "});
      }

      res.status(200).json({
        message:"Successfully logged out !"
      });

    }catch (error){
       res.json({message : "Internal Servar Error "})
    }
}


export { registerUser , loginUser , logoutUser};