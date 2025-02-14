// import StudentList from './students/StudentList';
// import StudentCreate from './students/StudentCreate';
// import StudentView from './students/StudentView';
// import StudentEdit from './students/StudentEdit';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import StudentCreate from './student/StudentCreate';
import StudentList from './student/StudentList';
import StudentEdit from './student/StudentEdit';
import StudentView from './student/StudentView';
// import StudentCreate from './Student/StudentCreate';
// import StudentList from './Student/StudentList';
// import StudentEdit from './Student/StudentEdit';
// import StudentView from './Student/StudentView';

function App() {
  return (
    <>
    
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="" element={<StudentList />} />
            <Route path="/students/list" element={<StudentList />} />
            <Route path="/students/create" element={<StudentCreate />} />
            <Route path="/students/view/:usn" element={<StudentView />} />
            <Route path="/students/edit/:usn" element={<StudentEdit />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;