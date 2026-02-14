import express from "express";

const app = express(); // express app

app.use(express.json());

//routes 
import userRouter from './routes/user.route.js';
// import postRouter from './routes/post.route.js';
import postRouter from './routes/post.route.js';


//routes declaration
app.use("/api/v1/users" , userRouter);
// app.use("/api/v1/posts" , postRouter);

app.get("/" , (req , res) => {
    res.send("Hey its me the backend , i am alive and kicking !!!");
});

app.use("/api/v1/posts" , postRouter);

//example route : https://localhost:3000/api/v1/users/register
export default app;

