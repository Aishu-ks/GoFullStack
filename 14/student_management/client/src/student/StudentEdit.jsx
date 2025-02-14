import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../header/PageHeader";
import axios from 'axios';

function StudentEdit() {
    const [student, setStudent] = useState({ usn: '', name: '', section: '', type: '' });
    const [loading, setLoading] = useState(false); // Track loading state
    const params = useParams();
    const navigate = useNavigate();

    const txtBoxOnChange = event => {
        setStudent({
            ...student,
            [event.target.id]: event.target.value
        });
    };

    const readById = async () => {
        const baseUrl = "http://localhost:8080";
        try {
            const response = await axios.get(`${baseUrl}/students/${params.usn}`); // Fixed template literal
            setStudent(response.data);
        } catch (error) {
            console.error("Error fetching student:", error);
            alert('Server Error: ' + (error.response?.data?.error || error.message));
        }
    };

    const updateStudent = async () => {
        const baseUrl = "http://localhost:8080";
        setLoading(true); // Set loading to true
        try {
            const response = await axios.put(`${baseUrl}/students/${params.usn}`, student); // Fixed template literal
            alert(response.data.message);
            navigate('/students/list');
        } catch (error) {
            console.error("Error updating student:", error);
            alert('Server Error: ' + (error.response?.data?.error || error.message));
        } finally {
            setLoading(false); // Set loading to false after request completes
        }
    };

    useEffect(() => {
        readById();
    }, []);

    return (
        <>
            <PageHeader />
            <h3>
                <a href="/students/list" className="btn btn-light">Go Back</a> Edit Student
            </h3>
            <div className="container">
                <div className="form-group mb-3">
                    <label htmlFor="usn" className="form-label">USN:</label>
                    <div className="form-control">{student.usn}</div> {/* Using div for readonly */}
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="name" className="form-label">Student Name:</label>
                    <input type="text" className="form-control" id="name" 
                        placeholder="Please enter student name"
                        value={student.name} 
                        onChange={txtBoxOnChange} />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="section" className="form-label">Section:</label>
                    <input type="text" className="form-control" id="section" 
                        placeholder="Please enter section"
                        value={student.section} 
                        onChange={txtBoxOnChange} />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="type" className="form-label">Type:</label>
                    <input type="text" className="form-control" id="type" 
                        placeholder="Please enter type"
                        value={student.type} 
                        onChange={txtBoxOnChange} />
                </div>
                <button className="btn btn-warning" onClick={updateStudent} disabled={loading}>
                    {loading ? "Updating..." : "Update Student"} {/* Show loading state */}
                </button>
            </div>
        </>
    );
}

export default StudentEdit;