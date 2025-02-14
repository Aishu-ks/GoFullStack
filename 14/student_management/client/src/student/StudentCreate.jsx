import { useState } from "react";
import PageHeader from "../header/PageHeader";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function StudentCreate() {
    const [student, setStudent] = useState({ usn: '', name: '', section: '', type: '' });
    const navigate = useNavigate();

    const txtBoxOnChange = event => {
        setStudent({ ...student, [event.target.id]: event.target.value });
    };

    const createStudent = async () => {
        const baseUrl = "http://localhost:8080";
        try {
            const response = await axios.post(`${baseUrl}/students`, student); // Fixed template literal
            alert(response.data.message);
            navigate('/students/list');
        } catch (error) {
            alert('Server Error');
        }
    };
    
    return (
        <>
            <PageHeader />            
            <h3><a href="/students/list" className="btn btn-light">Go Back</a> Add Student</h3>
            <div className="container">
                <div className="form-group mb-3">
                    <label htmlFor="usn" className="form-label">USN:</label>
                    <input type="text" className="form-control" id="usn" 
                        placeholder="please enter USN"
                        value={student.usn} 
                        onChange={txtBoxOnChange} />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="name" className="form-label">Student Name:</label>
                    <input type="text" className="form-control" id="name" 
                        placeholder="please enter student name"
                        value={student.name} 
                        onChange={txtBoxOnChange} />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="section" className="form-label">Section:</label>
                    <input type="text" className="form-control" id="section" 
                        placeholder="please enter section"
                        value={student.section} 
                        onChange={txtBoxOnChange} />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="type" className="form-label">Type:</label>
                    <input type="text" className="form-control" id="type" 
                        placeholder="please enter type"
                        value={student.type} 
                        onChange={txtBoxOnChange} />
                </div>
                <button className="btn btn-primary" onClick={createStudent}>Create Student</button>
            </div>
        </>
    );
}

export default StudentCreate;