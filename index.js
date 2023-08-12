import express from 'express';
import cors from "cors";
import * as dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import { mentorRouter } from './Routes/mentors.js';
import { studentsRouter } from './Routes/students.js';
import { assignRouter } from './Routes/assign.js';

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());


const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

async function createConnection(){
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("Mongo is connected")
    return client;
}

export const client = await createConnection();

app.get("/", (req,res) => {
    res.send(`Hi There!!!`)
});

//If you are creating students and mentors data, Please try to create respective data in the given below field(key) format

// 1. students data : 
//      {
//        studentId   : any Number,
//        studentName : your wish,
//        assigned    : "No"
//      }

// 2. mentors data : 
//      { 
//         mentorId   : any Number,
//         mentorName : "",
//      }


app.use("/mentors",mentorRouter);
app.use("/students",studentsRouter)
app.use("/assign",assignRouter)

app.listen(PORT,()=> console.log("Server started on PORT",PORT));