import express from 'express';
import dotenv from 'dotenv'
import connectDB from './utils/db.js';
import cookieParser from 'cookie-parser';
import {userRouter} from './routes/user.routes.js'
import cors from 'cors';
import {errorHandler} from './middlewares/err.middlewares.js'
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static("public"));
app.use(cookieParser());
app.use(cors({
  origin: "https://notely-henna.vercel.app",  // 🔥 EXACT MATCH
  credentials: true,
  methods: ["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));





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
app.use(errorHandler); // using it to format errors into json format
// app.use('/api/v1/admin',adminRouter);

