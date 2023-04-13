import express from 'express';
import { addStudent } from '../helper.js';
const router = express.Router();

//To create student
router.post("/create",async(req,res)=>{
    const{id,name,assigned}= req.body;
    const create = await addStudent(id,name,assigned)
    if(create){
        res.send({message:"Successfully created"})
    }else{
        res.status(404).send({error:"Error Occurred"})
    }
})



export const studentsRouter = router;