import express from "express";
import { getMentor, getStudent, updateAssignedData, updateStudentById, getAssignedData } from "../helper.js";

const router = express.Router();

router.post("/", async(req,res)=>{
    const mentor = await getMentor(req);
    const mentorName = mentor.mentorName;
    // console.log(mentorName);
    const unAssignedStudent = await getStudent();
    if(unAssignedStudent){
        const studentName  = unAssignedStudent.studentName;
        const status       = unAssignedStudent.assigned;
        const getAssigned  = await getAssignedData(mentorName);
        const mentorId     = getAssigned._id;
        const studentsList = getAssigned.studentsAssigned;
        const assignedData = {
            mentorName       : mentorName,
            studentsAssigned : [...studentsList] 
        }
        assignedData.studentsAssigned.push(studentName);
        const updateAssigned = await updateAssignedData(mentorId,assignedData)
        // console.log(assignedData)
        if(updateAssigned){
            unAssignedStudent.assigned = "Yes";
            const id = unAssignedStudent._id;
            const updatedStudent = await updateStudentById(id,unAssignedStudent);
            res.send({message:"Assigned Successfully"});
        }
        
    }else{
        res.status(404).send({error:"All the students has been assigned"})
    }
    
})


export const assignRouter = router;