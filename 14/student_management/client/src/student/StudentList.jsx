
import { useEffect, useState } from "react";
import PageHeader from "../header/PageHeader";
import axios from 'axios';

function StudentList() {
    const [students, setStudents] = useState([]);

    const readAllStudents = async () => {
        try {
            const baseUrl = 'http://localhost:8080';
            const response = await axios.get(`${baseUrl}/students`);
            setStudents(response.data);
        } catch (error) {
            alert('Server Error');
        }
    };

    const deleteStudent = async (usn) => {
        if (!window.confirm("Are you sure to delete?")) {
            return;
        }
        const baseUrl = "http://localhost:8080";
        try {
            const response = await axios.delete(`${baseUrl}/students/${usn}`);
            alert(response.data.message);
            await readAllStudents();
        } catch (error) {
            alert('Server Error');
        }
    };

    useEffect(() => {
        readAllStudents();
    }, []);

    return (
        <>
            <PageHeader />
            <h3>List of Students</h3>
            <div className="container">
                <table className="table table-success table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">USN</th>
                            <th scope="col">Name</th>
                            <th scope="col">Section</th>
                            <th scope="col">Type</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody> 
                        {students.length > 0 ? students.map((student) => (
                            <tr key={student.usn}>
                                <td>{student.usn}</td>
                                <td>{student.name}</td>
                                <td>{student.section}</td>
                                <td>{student.type}</td>
                                <td>
                                    <a href={`/students/view/${student.usn}`} className="btn btn-success">View</a>
                                    &nbsp;
                                    <a href={`/students/edit/${student.usn}`} className="btn btn-warning">Edit</a>
                                    &nbsp;
                                    <button className="btn btn-danger" onClick={() => deleteStudent(student.usn)}>Delete</button>
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan="5">No Data Found</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default StudentList;
