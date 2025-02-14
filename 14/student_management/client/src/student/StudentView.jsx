
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageHeader from "../header/PageHeader";
import axios from 'axios';

function StudentView() {
    const [student, setStudent] = useState({ usn: '', name: '', section: '', type: '' });
    const params = useParams();

    const readById = async () => {
        const baseUrl = "http://localhost:8080";
        try {
            const response = await axios.get(`${baseUrl}/students/${params.usn}`); // Fixed template literal
            setStudent(response.data);
        } catch (error) {
            alert('Server Error');
        }
    };

    useEffect(() => {
        readById();
    }, []);

    return (
        <>
            <PageHeader />
            <h3>
                <a href="/students/list" className="btn btn-light">Go Back</a> View Student
            </h3>
            <div className="container">
                <div className="form-group mb-3">
                    <label className="form-label">USN:</label>
                    <div className="form-control">{student.usn || "N/A"}</div>
                </div>
                <div className="form-group mb-3">
                    <label className="form-label">Name:</label>
                    <div className="form-control">{student.name || "N/A"}</div>
                </div>
                <div className="form-group mb-3">
                    <label className="form-label">Section:</label>
                    <div className="form-control">{student.section || "N/A"}</div>
                </div>
                <div className="form-group mb-3">
                    <label className="form-label">Type:</label>
                    <div className="form-control">{student.type || "N/A"}</div>
                </div>
            </div>
        </>
    );
}

export default StudentView;
