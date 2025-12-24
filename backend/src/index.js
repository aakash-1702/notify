import express from 'express';
import dotenv from 'dotenv'
import connectDB from './utils/db.js';
import cookieParser from 'cookie-parser';
import {userRouter} from './routes/user.routes.js'
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static("public"));
app.use(cookieParser());


const PORT = process.env.PORT;


 

await connectDB()
     .then(() => {
        app.listen(PORT , () =>{
            console.log(`Server started at PORT : ${PORT}`);
        })
     })
     .catch((e) => {
        console.log("Error occured while connecting to the server",e);
     });



app.use('/api/v1/users',userRouter);
// app.use('/api/v1/admin',adminRouter);

