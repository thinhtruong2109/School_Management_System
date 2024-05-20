
import './App.css';

import { BrowserRouter, Routes, Route } from  'react-router-dom'
import Home from './Home/home';
import Initial from  './Home/initial';
import Student from  './Home/User/Student/students';
import StudentHocTap from './Home/User/Student/HocTap';
import StudentDangKiMonHoc from './Home/User/Student/DangKiMonHoc';
import StudentThoiKhoaBieu from './Home/User/Student/ThoiKhoaBieu';
import StudentInfo from './Home/User/Student/StudentInfo';

import Admin from  './Home/User/Admin/admin';
import AdminQuanLyStudent from './Home/User/Admin/QuanLyStudent';
import AdminQuanLyTeacher from './Home/User/Admin/QuanLyTeacher';
import AdminTaoMonHoc from './Home/User/Admin/TaoMonHoc';
import AdminCourseController from './Home/User/Admin/CoursesController';
import Student_Info_1 from './Home/User/Admin/Student_Info_1';
import Teacher_Info from './Home/User/Admin/Teacher_Info';

import Teacher from  './Home/User/Teacher/teachers';
import TeacherInfo from './Home/User/Teacher/TeacherInfo';
import LichDayHoc from './Home/User/Teacher/LichDayHoc';
import DangKiDay from './Home/User/Teacher/DangKiDay';

function App() {
  
  
  return (

    <BrowserRouter>
      < Routes>
        <Route path='/home' exact element={<Home />} />
        <Route path='/initial' exact element={<Initial />} />

        <Route path='/home/students'exact element={<Student />} />
          <Route path='/home/students/HocTap' exact element={<StudentHocTap/>} />
          <Route path='/home/students/DangKiMonHoc' exact element={<StudentDangKiMonHoc />} />
          <Route path='/home/students/ThoiKhoaBieu' exact element= {<StudentThoiKhoaBieu />} />
          <Route path='/home/students/StudentInFo' exact element= {<StudentInfo />} />

        <Route path='/home/admin' exact element={<Admin />} />
          <Route path='/home/admin/QuanLyStudent' exact element={<AdminQuanLyStudent />} />
          <Route path='/home/admin/Student_Info_1' exact element={<Student_Info_1 />} />
          <Route path='/home/admin/QuanLyTeacher' exact element= {<AdminQuanLyTeacher />} />
          <Route path='/home/admin/TaoMonHoc' exact element= {<AdminTaoMonHoc />} />
          <Route path='/home/admin/Teacher_Info' exact element= {<Teacher_Info />} />
          <Route path='/home/admin/CoursesController' exact element= {<AdminCourseController />} />
          
      <Route path='/home/teachers' exact element={<Teacher />} />
          <Route path='/home/teachers/TeacherInfo' exact element={<TeacherInfo />} />
          <Route path='/home/teachers/LichDayHoc' exact element={<LichDayHoc />} />
          <Route path='/home/teachers/DangKiDay' exact element={<DangKiDay />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
