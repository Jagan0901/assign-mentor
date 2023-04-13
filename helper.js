import { client } from './index.js';


export async function addMentor(id,name){
    return await client
      .db("Assign-mentor")
      .collection("mentors")
      .insertOne({mentorId:id, mentorName: name});
}

export async function mentorData(mentor){
    return await client
      .db("Assign-mentor")
      .collection("assigned")
      .insertOne(mentor);
}

export async function addStudent(id,name,assigned){
    return await client
      .db("Assign-mentor")
      .collection("students")
      .insertOne({studentId:id, studentName: name, assigned:assigned});
}

export async function getMentor(req){
    return await client
      .db("Assign-mentor")
      .collection("mentors")
      .findOne(req.query);
}

export async function getMentorsData(req){
    return await client
      .db("Assign-mentor")
      .collection("assigned")
      .find(req.query)
      .toArray();
}

export async function getStudent(){
    return await client
      .db("Assign-mentor")
      .collection("students")
      .findOne({assigned:"No"});
}

export async function getAssignedData(mentorName){
    return await client
      .db("Assign-mentor")
      .collection("assigned")
      .findOne({mentorName:mentorName});
}

export async function updateAssignedData(id,assignedData){
    return await client
      .db("Assign-mentor")
      .collection("assigned")
      .updateOne({_id:id},{$set:assignedData});
}

export async function updateStudentById(id,unAssignedStudent){
    return await client
      .db("Assign-mentor")
      .collection("students")
      .updateOne({_id:id},{$set : unAssignedStudent});
}