import express from 'express';
import * as dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import { mentorRouter } from './Routes/mentors.js';
import { studentsRouter } from './Routes/students.js';
import { assignRouter } from './Routes/assign.js';

dotenv.config();

const app = express();

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


app.use("/mentors",mentorRouter);
app.use("/students",studentsRouter)
app.use("/assign",assignRouter)

app.listen(PORT,()=> console.log("Server started on PORT",PORT));