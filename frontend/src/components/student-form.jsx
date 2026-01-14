import { useState } from "react";
import "./studentForm.css" 

function StudentForm(){
    const [name, setName]=useState("");
    const [age, setAge]=useState("");
    const [email, setEmail]=useState("");

    async function handleSubmit(e){
        e.preventDefault();
        const studentData = {
            name,
            age,
            email,
        };
        
        try{
            const response = await fetch("http://localhost:5000/api/students", {
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body:JSON.stringify(studentData),
            });
            const data = await response.json();
            console.log("Student saved",data);

            setName("");
            setAge("");
            setEmail("");
        }
        catch(error){
            console.error("error:", error);
        }        
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Student registration form</h2>
                <input type="text" placeholder="Enter name" value={name} onChange={(e)=>setName(e.target.value)}/>
                <input type="number" placeholder="Enter age" value={age} onChange={(e)=>setAge(e.target.value)} />
                <input type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                <br /><br />
                <button type="submit">Submit</button>
            </form>
            
        </div>
    )
}


export default StudentForm;