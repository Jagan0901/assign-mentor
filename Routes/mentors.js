import express from  'express';
import { addMentor, mentorData, getMentorsData } from '../helper.js';
const router = express.Router();

//To create mentor
router.post("/create", async(req,res)=>{
     const {id,name} = req.body;
     const create = await addMentor(id,name);
     if(create){
      const mentor = {
         mentorName       : name,
         studentsAssigned : [] 
     }

      const creates = await mentorData(mentor)
        res.send({message:"Successfully created"})
     }else{
        res.status(404).send({error:"Error Occurred"})
     }
});

//To show the mentor having the all students
router.get("/get", async(req,res)=>{
   const mentorsData = await getMentorsData(req);
   res.send(mentorsData);
})




export const mentorRouter = router;