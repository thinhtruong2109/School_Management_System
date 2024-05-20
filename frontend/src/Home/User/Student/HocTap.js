import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import React, { useState, useEffect,useRef } from 'react';
import {useNavigate}  from 'react-router-dom';
import { styled} from '@mui/material';
import axios from 'axios'; 
import * as xlsx from 'xlsx';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import GetAppIcon from '@mui/icons-material/GetApp';
import StarExplosion from './Starbg'
import { ScoreChart } from './ScoreChart';
import { PassScore } from './PassScore';
import { LevelScore } from './LevelScore';
import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined';
import ArticleIcon from '@mui/icons-material/Article';
import jsPDF from 'jspdf';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


function HocTap() {
  const navigate = useNavigate();
  const tableBodyRefInProgress = useRef(null);
  const tableHeadRefInProgress = useRef(null);
  const tableBodyRefFinishPass = useRef(null);
  const tableHeadRefFinishPass = useRef(null);
  const tableBodyRefFinishFail = useRef(null);
  const tableHeadRefFinishFail = useRef(null);
  const tableBodyRefSheetMark = useRef(null);
  const tableHeadRefSheetMark = useRef(null);
  const handleHomeClick = () => {
    // Hiển thị ô vuông khi bấm nút SignUp
      navigate('/home')
  };

  const RegistButton = styled (Button)
  ({
      fontSize: '0.8rem', // Kích thước của nút
      color: '#FFFFFF', // Màu chữ của nút
      borderRadius: '10px', // Bo tròn góc của viền
      padding: '10px 10px',
      fontWeight: 'bold',
      textTransform: 'none',
      '&: hover': { backgroundColor: '#BCA9F5'}
  })

  const handleStudentHome = () =>
  {
    navigate('/home/students')
  }

  const FunctionButton = styled (Button)
  ({
    fontSize: '1.0rem', // Kích thước của nút
      color: '#FFFFFF', // Màu chữ của nút
      border: '0px solid #380B61', // Viền nằm trong nút
      borderRadius: '3px', // Bo tròn góc của viền
      padding: '10px 25px',
      display: 'flex', // Sử dụng flexbox để căn chỉnh
      alignItems: 'center', 
      fontWeight: 'bold',
      textTransform: 'none',
      '&: hover': { backgroundColor: '#BCA9F5'}
})
  const handleStudentInfo = (e) => {
    navigate('/home/students/StudentInFo')
  }
  const handleLogOut = (e) =>
  {
  localStorage.removeItem('StudentUserID');
  localStorage.removeItem('StudentName');
  navigate('/home')
  }

  const StudentUserID = localStorage.getItem('StudentUserID');
  const StudentName =localStorage.getItem("StudentName");


  const [dummyDataInProgress, setDummyDataInProgress] = useState([]);
  const [dummyDataFinishPass, setDummyDataFinishPass] = useState([]);
  const [dummyDataFinishFail, setDummyDataFinishFail] = useState([]);
  const [dummyDataSheetMark, setDummyDataSheetMark] = useState([]);


  function getInProgress(studentId) {
    const baseURL = 'http://localhost:8080';
    const url = `${baseURL}/sheetmark/student_status?studentId=${studentId}&status=inProgress`;
  
    axios.get(url)
      .then(response => {
        if (response.data.status === 'success') {
          // Handle the successful response
          const inProgressData = response.data.data;
          console.log(inProgressData)
          // Update the table data with weeklyScheduleData
          updateTableDataInProgress(inProgressData);
        } else {
          console.log('No schedule found:', response.data.message);
        }
      })
      .catch(error => {
        console.error('Error fetching weekly schedule:', error);
      });
  }

function updateTableDataInProgress(inProgressData) {
  // Create a new array to store the table rows
  const tableRows = [];

  // Iterate over the weeklyScheduleData
  if (inProgressData&&Array.isArray(inProgressData)) {
    inProgressData.forEach(course => {
      // Create a new row object for each course
      const roundedFinalGrade = typeof course.finalGrade === 'number' ? course.finalGrade.toFixed(2) : null;
      let tinChi; 
      if (course.courseLevel==="BEGINNER") tinChi="3"
      else{
        tinChi="4"
      }
      
      let DanhGia="N/A";
      if (course.finalGrade<4)
      {
        DanhGia="F"
      }
      if (course.finalGrade>=4&&course.finalGrade<5.5)
      {
        DanhGia="D"
      }
      if (course.finalGrade>=5.5&&course.finalGrade<7)
      {
        DanhGia="C"
      }
      if (course.finalGrade>=7&&course.finalGrade<8.5)
      {
        DanhGia="B"
      }
      if (course.finalGrade>=8.5&&course.finalGrade<=10)
      {
        DanhGia="A"
      }
      if (course.finalGrade===null)
      {
        DanhGia="N/A"
      }
      console.log(DanhGia)
      const row = {
        MaMH: course.courseId,
        TenMonHoc: course.courseName,
        TinChi: tinChi,
        courseLevel: course.courseLevel,
        assignmentScore: course.assignmentScore,
        projectScore: course.projectScore,
        midTermScore: course.midTermScore,
        finalExamScore: course.finalExamScore,
        finalGrade: roundedFinalGrade,
        DanhGia: DanhGia,

      };

      // Add the row to the tableRows array
      tableRows.push(row);
    });
  }

  // Update the component state with the new tableRows array
  setDummyDataInProgress(tableRows);
}



function getFinishedPass(studentId) {
  const baseURL = 'http://localhost:8080';
  const url = `${baseURL}/sheetmark/student_status?studentId=${studentId}&status=Completed_in_pass`;

  axios.get(url)
    .then(response => {
      if (response.data.status === 'success') {
        // Handle the successful response
        const FinishedData = response.data.data;
        console.log(FinishedData)
        // Update the table data with weeklyScheduleData
        updateFinishedDataPass(FinishedData);
      } else {
        console.log('No schedule found:', response.data.message);
      }
    })
    .catch(error => {
      console.error('Error fetching weekly schedule:', error);
    });
}

function updateFinishedDataPass(FinishedData) {
  // Create a new array to store the table rows
  const tableRows = [];
  console.log("HelloPass1",FinishedData)
  // Iterate over the weeklyScheduleData
  if (FinishedData&&Array.isArray(FinishedData)) {
    FinishedData.forEach(course => {
      // Create a new row object for each course
      const roundedFinalGrade = parseFloat((course.finalGrade).toFixed(2));
      console.log("helloPass2",course)
      let tinChi;
      if (course.courseLevel==="BEGINNER") tinChi="3"
      else{
        tinChi="4"
      }
      let DanhGia="N/A";
      if (course.finalGrade<4)
      {
        DanhGia="F"
      }
      if (course.finalGrade>=4&&course.finalGrade<5.5)
      {
        DanhGia="D"
      }
      if (course.finalGrade>=5.5&&course.finalGrade<7)
      {
        DanhGia="C"
      }
      if (course.finalGrade>=7&&course.finalGrade<8.5)
      {
        DanhGia="B"
      }
      if (course.finalGrade>=8.5&&course.finalGrade<=10)
      {
        DanhGia="A"
      }
   
      if (course.finalGrade==null)
      {
        DanhGia="N/A"
      }
      const row = {
        MaMH: course.courseId,
        TenMonHoc: course.courseName,
        TinChi: tinChi,
        courseLevel: course.courseLevel,
        assignmentScore: course.assignmentScore,
        projectScore: course.projectScore,
        midTermScore: course.midTermScore,
        finalExamScore: course.finalExamScore,
        finalGrade: roundedFinalGrade, 
        DanhGia: DanhGia,
      };

      // Add the row to the tableRows array
      tableRows.push(row);
    });
  }

  // Update the component state with the new tableRows array
  setDummyDataFinishPass(tableRows);
}

function getFinishedFail(studentId) {
  const baseURL = 'http://localhost:8080';
  const url = `${baseURL}/sheetmark/student_status?studentId=${studentId}&status=Completed_in_fail`;

  axios.get(url)
    .then(response => {
      if (response.data.status === 'success') {
        // Handle the successful response
        const FinishedData = response.data.data;
        // Update the table data with weeklyScheduleData
        updateFinishedDataFail(FinishedData);
      } else {
        console.log('No schedule found:', response.data.message);
      }
    })
    .catch(error => {
      console.error('Error fetching weekly schedule:', error);
    });
}

function updateFinishedDataFail(FinishedData) {
  // Create a new array to store the table rows
  const tableRows = [];
  console.log("HelloFail1",FinishedData)
  // Iterate over the weeklyScheduleData
  if (FinishedData&&Array.isArray(FinishedData)) {
    FinishedData.forEach(course => {
      // Create a new row object for each course
      const roundedFinalGrade = parseFloat((course.finalGrade).toFixed(2));
      console.log("HelloFail2",course)
      let tinChi;
      if (course.courseLevel==="BEGINNER") tinChi="3"
      else{
        tinChi="4"
      }
      
   
      const row = {
        MaMH: course.courseId,
        TenMonHoc: course.courseName,
        TinChi: tinChi,
        courseLevel: course.courseLevel,
        assignmentScore: course.assignmentScore,
        projectScore: course.projectScore,
        midTermScore: course.midTermScore,
        finalExamScore: course.finalExamScore,
        finalGrade: roundedFinalGrade,
        DanhGia: "Học lại",
      };

      // Add the row to the tableRows array
      tableRows.push(row);
    });
  }

  // Update the component state with the new tableRows array
  setDummyDataFinishFail(tableRows);
}




const [TableFlag, setTableFlag]= useState("InProgress");


  const handleInProgress=() =>
  {
    getInProgress(StudentUserID)
    setTableFlag("InProgress")
  }

  const handleFinishedPass=() =>
  {
    getFinishedPass(StudentUserID)
    setTableFlag("FinishedPass")
    fetchStudentGPA();
  }
  const handleFinishedFail=() =>
  {
    getFinishedFail(StudentUserID)
    setTableFlag("FinishedFail")
  }


  useEffect(() => {
    if (StudentUserID) {
      handleInProgress();
    }
  }, [StudentUserID]);

  const exportToExcel = () => {
    const tableHead = tableHeadRefInProgress.current.rows[0].cells;
    const tableBody = tableBodyRefInProgress.current.rows;
    const tableData = [];
  
    // Thêm dòng tiêu đề từ TableHead
    const headerRow = [];
    for (let i = 0; i < tableHead.length; i++) {
      headerRow.push(tableHead[i].innerText);
    }
    tableData.push(headerRow);
  
    // Thêm dữ liệu từ TableBody
    for (let i = 0; i < tableBody.length; i++) {
      const rowData = [];
      const cells = tableBody[i].cells;
  
      for (let j = 0; j < cells.length; j++) {
        rowData.push(cells[j].innerText);
      }
  
      tableData.push(rowData);
    }
  
    const worksheet = xlsx.utils.aoa_to_sheet(tableData);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    xlsx.writeFile(workbook, 'Bang_diem_hoc_ky_hien_tai.xlsx');
  };

  const exportToExcelPass = () => {
    const tableHead = tableHeadRefFinishPass.current.rows[0].cells;
    const tableBody = tableBodyRefFinishPass.current.rows;
    const tableData = [];
  
    // Thêm dòng tiêu đề từ TableHead
    const headerRow = [];
    for (let i = 0; i < tableHead.length; i++) {
      headerRow.push(tableHead[i].innerText);
    }
    tableData.push(headerRow);
  
    // Thêm dữ liệu từ TableBody
    for (let i = 0; i < tableBody.length; i++) {
      const rowData = [];
      const cells = tableBody[i].cells;
  
      for (let j = 0; j < cells.length; j++) {
        rowData.push(cells[j].innerText);
      }
  
      tableData.push(rowData);
    }
  
    const worksheet = xlsx.utils.aoa_to_sheet(tableData);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    xlsx.writeFile(workbook, 'Bang_Diem_Mon_Da_Hoc.xlsx');
  };

  const createPDF = (courseTitle,courseLevel) => {
    const doc = new jsPDF();

  // Thiết lập font cho văn bản
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);

  // Tính toán vị trí để đặt tên môn học ở giữa trang
  const textWidth = doc.getStringUnitWidth(courseTitle) * doc.internal.getFontSize() / doc.internal.scaleFactor;
  const textWidth2 = doc.getStringUnitWidth(courseLevel) * doc.internal.getFontSize() / doc.internal.scaleFactor;
  const pageWidth = doc.internal.pageSize.getWidth();
  const x = (pageWidth - textWidth) / 2;
  const x2 = (pageWidth - textWidth2) / 2;
  const y = 50; // Vị trí dọc tính từ đỉnh trang

  // Thêm tên môn học vào giữa trang
  doc.text(courseTitle, x, y);
  doc.text(courseLevel, x2, y+10);

  // Lưu file PDF
  doc.save(`${courseTitle} ${courseLevel}.pdf`);
  };
  const handleDocument = (courseName,courseLevel) =>
  {
    createPDF(courseName,courseLevel);
  }

  const HandleGhiDanh = () =>
  {
    navigate('/home/students/DangKiMonHoc')
  }
  const [studentGPA, setstudentGPA] = useState('');
  const [studentCredits, setstudentCredits] = useState('');
  const fetchStudentGPA = async () => {
    try {
      console.log(StudentUserID)
      const response = await axios.get(`http://localhost:8080/student/${StudentUserID}/credits-gpa`);
      const { data } = response.data;
      console.log(data)
      const GPA = parseFloat((data.gpaOnScaleFour).toFixed(2));
      setstudentGPA(GPA);
      setstudentCredits(data.totalCredits);
      
    } catch (error) {
      console.error('Error fetching student data:',);
    }
  };





  const [sheetmarkCourse, setsheetmarkCourse]=useState('false')

  const handleCourse_Level_Mark = (courseId) =>
  {
    setsheetmarkCourse("true");
    getSheetMark(courseId)
  }
  const handleCourse_Level_Mark_Close = (e) =>
  {
    setsheetmarkCourse("false");
  }



  function getSheetMark(courseId) {
    const baseURL = 'http://localhost:8080';
    const url = `${baseURL}/sheetmark/course?studentId=${StudentUserID}&courseId=${courseId}`;
  
    axios.get(url)
      .then(response => {
        if (response.data.status === 'success') {
          // Handle the successful response
          const MarkData = response.data.data;
          
          console.log("MarkData:----",MarkData)
          updateSheetMark(MarkData);
        } else {
          console.log('No schedule found:', response.data.message);
        }
      })
      .catch(error => {
        console.error('Error fetching weekly schedule:', error);
      });
  }
  
  function updateSheetMark(MarkData) {
    // Create a new array to store the table rows
    const tableRows = [];
  
    // Iterate over the weeklyScheduleData
    console.log(MarkData.sheetMarkForBeginner)
    
    console.log(MarkData.sheetMarkForIntermediate)
    
    console.log(MarkData.sheetMarkForAdvanced)
    
    if (MarkData.sheetMarkForBeginner)
    {
      const rowBeginner = {
        MaMH: MarkData.sheetMarkForBeginner.courseId,
        TenMonHoc: MarkData.sheetMarkForBeginner.courseName,
        courseLevel: MarkData.sheetMarkForBeginner.courseLevel,
        finalGrade: parseFloat((MarkData.sheetMarkForBeginner.finalGrade).toFixed(2))
      }
      tableRows.push(rowBeginner);
      console.log("Beginner---",rowBeginner)
    }
    if (MarkData.sheetMarkForIntermediate!=null)
    {
      const rowIntermediate = {
        MaMH: MarkData.sheetMarkForIntermediate.courseId,
        TenMonHoc: MarkData.sheetMarkForIntermediate.courseName,
        courseLevel: MarkData.sheetMarkForIntermediate.courseLevel,
        finalGrade: parseFloat((MarkData.sheetMarkForIntermediate.finalGrade).toFixed(2))
      }
      tableRows.push(rowIntermediate);
      console.log("Intermediate---",rowIntermediate)
    }

    if (MarkData.sheetMarkForAdvanced!=null)
    {
      const rowAdvanced = {
        MaMH: MarkData.sheetMarkForAdvanced.courseId,
        TenMonHoc: MarkData.sheetMarkForAdvanced.courseName,
        courseLevel: MarkData.sheetMarkForAdvanced.courseLevel,
        finalGrade: parseFloat((MarkData.sheetMarkForAdvanced.finalGrade).toFixed(2))
      }
      tableRows.push(rowAdvanced);
      console.log("Advanced---",rowAdvanced)
    }

    
  
    //tableRows.push(row);


    // Update the component state with the new tableRows array
    setDummyDataSheetMark(tableRows);
  }


  return (
    <div style={{ 
      backgroundImage: 'url("/bg1.jpg")', // Sử dụng đường dẫn từ thư mục public
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      zIndex: 5, 
      overflow: 'hidden', 

    }}>

    <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 0// Đặt z-index thấp hơn nội dung
          }}>
            <StarExplosion />
          </div>

        {StudentUserID ? (
<>


        <AppBar position='static'>
            <Toolbar  className='custom-toolbar' sx={{ bgcolor: 'transparent' ,}}>
            <img src="/Hogwarts.png" alt="Icon" width="80" height="50" />
                <Typography variant='h5' style={{ fontWeight: 'bold' }} align='left' sx={{flexGrow:11} } > HCM Hogwarts  University </Typography>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ flexGrow: 400 }}>
                    <Stack direction="row">
                    <FunctionButton onClick={handleStudentHome}>Trang Chủ</FunctionButton>
                    </Stack>
                </Stack>
                <Stack direction={'row'}></Stack>
                <Stack direction={'row'}>
                    <FunctionButton onClick={handleStudentInfo}>
                    <AccountCircleIcon fontSize= 'large'  />
                    <Typography paddingLeft={1} ></Typography>
                      Student: {StudentName}  -   ID: {StudentUserID.toString().padStart(5, '0')}
                    </FunctionButton>
                    <FunctionButton onClick={handleLogOut}>
                      <LogoutIcon/>
                      <Typography paddingLeft={0.5} ></Typography>
                        Log Out
                    </FunctionButton>
                </Stack>
            </Toolbar>
        </AppBar>
      <Typography variant='h1' gutterBottom></Typography>


      <Stack direction='row'>
        <Box style = {{
          width: '250px', // Độ rộng của Box
          height: '50px', 
          fontSize: '1.0rem', // Kích thước của nút // Khoảng cách so với mép màn hình bên phải
          color: '#380B61', // Màu chữ của nút
          backgroundImage: 'url("/gradient.jpg")', 
          backgroundSize: 'cover',// Màu nền của nút
          borderRadius: '10px', // Bo tròn góc của viền
          justifyContent: 'center', // Căn chữ theo chiều ngang vào giữa,
          alignItems: 'center', 
          fontWeight: 'bold',
          position: 'relative', // Thiết lập position để có thể dịch chuyển
          left: '110px', // Dịch sang phải 100px
          top: '-10px'

        
          }}>
          <Typography variant='h5' style={{
            fontWeight: "bold",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}> Kết quả học tập</Typography>
        </Box>

       
          {TableFlag==='InProgress'&&(
            <>
              <RegistButton style={{
                width: '225px', // Độ rộng của Box
                height: '50px', 
                fontSize: '1.0rem', // Kích thước của nút // Khoảng cách so với mép màn hình bên phải
                borderRadius: '10px', // Bo tròn góc của viền
                justifyContent: 'center', // Căn chữ theo chiều ngang vào giữa,
                alignItems: 'center', 
                fontWeight: 'bold',
                textTransform: 'none',
                position: 'relative', // Thiết lập position để có thể dịch chuyển
                left: '130px', // Dịch sang phải 100px
                top: '-10px',
                }}
                onClick={handleFinishedPass}> <DoneOutlineIcon/> <Typography paddingLeft={0.8} ></Typography>Môn đã hoàn thành </RegistButton>
              <RegistButton style={{
                width: '180px', // Độ rộng của Box
                height: '50px', 
                fontSize: '1.0rem', // Kích thước của nút // Khoảng cách so với mép màn hình bên phải
                borderRadius: '10px', // Bo tròn góc của viền
                justifyContent: 'center', // Căn chữ theo chiều ngang vào giữa,
                alignItems: 'center', 
                fontWeight: 'bold',
                textTransform: 'none',
                position: 'relative', // Thiết lập position để có thể dịch chuyển
                left: '140px', // Dịch sang phải 100px
                top: '-10px',
                }}
                onClick={handleFinishedFail}> <CancelPresentationIcon/> <Typography paddingLeft={0.8} ></Typography>Môn đang nợ</RegistButton>
              <RegistButton style={{
                width: '200px', // Độ rộng của Box
                height: '50px', 
                fontSize: '1.0rem', // Kích thước của nút // Khoảng cách so với mép màn hình bên phải
                borderRadius: '10px', // Bo tròn góc của viền
                justifyContent: 'center', // Căn chữ theo chiều ngang vào giữa,
                alignItems: 'center', 
                fontWeight: 'bold',
                textTransform: 'none',
                position: 'relative', // Thiết lập position để có thể dịch chuyển
                left: '150px', // Dịch sang phải 100px
                top: '-10px',
                }}
              onClick={exportToExcel}> <GetAppIcon/> <Typography paddingLeft={0.8} ></Typography>Xuất Bảng Điểm</RegistButton>
              </>
              )}

          {TableFlag==='FinishedPass'&&(
                    <>
                    <RegistButton style={{              
                              width: '200px', // Độ rộng của Box
                              height: '50px', 
                              fontSize: '1.0rem', // Kích thước của nút // Khoảng cách so với mép màn hình bên phải
                              borderRadius: '10px', // Bo tròn góc của viền
                              justifyContent: 'center', // Căn chữ theo chiều ngang vào giữa,
                              alignItems: 'center', 
                              fontWeight: 'bold',
                              textTransform: 'none',
                              position: 'relative', // Thiết lập position để có thể dịch chuyển
                              left: '130px', // Dịch sang phải 100px
                              top: '-10px',
                              }}
                            onClick={handleInProgress}> <KeyboardDoubleArrowLeftOutlinedIcon/> <Typography paddingLeft={0.8} ></Typography>Về trang trước</RegistButton>
                            <RegistButton style={{
                              width: '210px', // Độ rộng của Box
                              height: '50px', 
                              fontSize: '1.0rem', // Kích thước của nút // Khoảng cách so với mép màn hình bên phải
                              borderRadius: '10px', // Bo tròn góc của viền
                              justifyContent: 'center', // Căn chữ theo chiều ngang vào giữa,
                              alignItems: 'center', 
                              fontWeight: 'bold',
                              textTransform: 'none',
                              position: 'relative', // Thiết lập position để có thể dịch chuyển
                              left: '140px', // Dịch sang phải 100px
                              top: '-10px',
                              }}
                            onClick={exportToExcelPass}> <GetAppIcon/> <Typography paddingLeft={0.8} ></Typography>Xuất Bảng Điểm</RegistButton>
                            
                    </>
              )}

          {TableFlag==='FinishedFail'&&(
                    <>
                    <RegistButton style={{              
                              width: '200px', // Độ rộng của Box
                              height: '50px', 
                              fontSize: '1.0rem', // Kích thước của nút // Khoảng cách so với mép màn hình bên phải
                              borderRadius: '10px', // Bo tròn góc của viền
                              justifyContent: 'center', // Căn chữ theo chiều ngang vào giữa,
                              alignItems: 'center', 
                              fontWeight: 'bold',
                              textTransform: 'none',
                              position: 'relative', // Thiết lập position để có thể dịch chuyển
                              left: '130px', // Dịch sang phải 100px
                              top: '-10px',
                              }}
                            onClick={handleInProgress}> <KeyboardDoubleArrowLeftOutlinedIcon/> <Typography paddingLeft={0.8} ></Typography>Về trang trước</RegistButton>
         
                    </>
              )}
      </Stack>

        {TableFlag==='InProgress'&&(
      <>
      <Box 
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="0vh">



        <TableContainer component={Paper}
          style={{
            backgroundImage: 'url("/gradient.jpg")', 
            backgroundSize: 'cover',
            borderRadius: '10px',
            width: '1450px', 
            zIndex: 1// Độ rộng của Box

          }}>
          <ScoreChart data={dummyDataInProgress} />
          </TableContainer>
      </Box>


                <Stack>
                  <Typography variant="h1" gutterBottom></Typography>
                </Stack>


      <Box 
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="0vh">

          <TableContainer component={Paper}
          style={{
            backgroundImage: 'url("/gradient.jpg")', 
            backgroundSize: 'cover',
            borderRadius: '10px',
            width: '1450px', 
            zIndex: 1// Độ rộng của Box

          }}>
          <Table>
            <TableHead ref={tableHeadRefInProgress}>
              <TableRow>
                <TableCell align='center' style={{ fontWeight: "bold",borderRight: "1px solid rgba(224, 224, 224, 1)" }} >Mã MH</TableCell>
                <TableCell align='center' style={{ fontWeight: "bold",borderRight: "1px solid rgba(224, 224, 224, 1)" }}>Tên môn học</TableCell>
                <TableCell align='center' style={{ fontWeight: "bold",borderRight: "1px solid rgba(224, 224, 224, 1)" }}>Tín chỉ</TableCell>
                <TableCell align='center' style={{ fontWeight: "bold",borderRight: "1px solid rgba(224, 224, 224, 1)" }}>Trình độ</TableCell>
                <TableCell align='center' style={{ fontWeight: "bold",borderRight: "1px solid rgba(224, 224, 224, 1)" }}> Assignment</TableCell>
                <TableCell align='center' style={{ fontWeight: "bold",borderRight: "1px solid rgba(224, 224, 224, 1)" }}> Project</TableCell>
                <TableCell align='center' style={{ fontWeight: "bold",borderRight: "1px solid rgba(224, 224, 224, 1)" }}> Giữa Kì</TableCell>
                <TableCell align='center' style={{ fontWeight: "bold",borderRight: "1px solid rgba(224, 224, 224, 1)" }}> Cuối Kì</TableCell>
                <TableCell align='center' style={{ fontWeight: "bold",borderRight: "1px solid rgba(224, 224, 224, 1)" }}> Tổng Kết</TableCell>
                <TableCell align='center' style={{ fontWeight: "bold",borderRight: "1px solid rgba(224, 224, 224, 1)" }}> Đánh giá</TableCell>
                <TableCell align='center' style={{ fontWeight: "bold",borderRight: "1px solid rgba(224, 224, 224, 1)" }}> Học liệu</TableCell>

                {/* Thêm các TableCell khác cho các cột */}
              </TableRow>
            </TableHead>
            <TableBody ref={tableBodyRefInProgress}>
              {/* Lặp qua dữ liệu và tạo các TableRow chứa TableCell */}
              {dummyDataInProgress.map((row) => (
                <TableRow key={row.id}>
                  <TableCell align='center' style={{width: '10px' ,borderRight: "1px solid rgba(224, 224, 224, 1)"}}>{row.MaMH}</TableCell>
                  <TableCell style={{width: '170px',borderRight: "1px solid rgba(224, 224, 224, 1)"}}>{row.TenMonHoc}</TableCell>
                  <TableCell align='center' style={{width: '50px',borderRight: "1px solid rgba(224, 224, 224, 1)"}}>{row.TinChi}</TableCell>
                  <TableCell align='center' style={{width: '70px',borderRight: "1px solid rgba(224, 224, 224, 1)"}}>{row.courseLevel}</TableCell>
                  <TableCell align='center' style={{width: '1px',borderRight: "1px solid rgba(224, 224, 224, 1)" }}>{row.assignmentScore}</TableCell>
                  <TableCell align='center' style={{width: '30px',borderRight: "1px solid rgba(224, 224, 224, 1)" }}>{row.projectScore}</TableCell>
                  <TableCell align='center' style={{width: '30px',borderRight: "1px solid rgba(224, 224, 224, 1)" }}>{row.midTermScore}</TableCell>
                  <TableCell align='center' style={{width: '50px',borderRight: "1px solid rgba(224, 224, 224, 1)" }}>{row.finalExamScore}</TableCell>
                  <TableCell align='center' style={{width: '50px',borderRight: "1px solid rgba(224, 224, 224, 1)" }}>{row.finalGrade}</TableCell>
                  <TableCell align='center' style={{width: '5px',borderRight: "1px solid rgba(224, 224, 224, 1)" }}><RegistButton style={{fontSize: '1.0rem',}} onClick={() => handleCourse_Level_Mark(row.MaMH)}>{row.DanhGia}</RegistButton></TableCell>
                  <TableCell align='center' style={{width: '10px',borderRight: "1px solid rgba(224, 224, 224, 1)" }}><RegistButton onClick={() => handleDocument(row.TenMonHoc,row.courseLevel)}><ArticleIcon/></RegistButton></TableCell>
                  

                  {/* Thêm các TableCell khác cho các cột */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </TableContainer>
      </Box>
      </>
      )}

      {TableFlag==='FinishedPass'&&(
        <>
                <Stack>
                  <Typography variant="h1" gutterBottom></Typography>
                </Stack>
                      <Box 
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      minHeight="0vh"
                    >



                        <TableContainer component={Paper}
                          style={{
                            backgroundImage: 'url("/gradient.jpg")', 
                            backgroundSize: 'cover',
                            borderRadius: '10px',
                            width: '800px', 
                            zIndex: 1// Độ rộng của Box

                          }}>
                          
                          <TableCell align='center' style={{fontWeight: "bold", fontSize: '1.2rem',width: '1000px' ,borderRight: "1px solid rgba(224, 224, 224, 1)"}}>Điểm GPA Tổng</TableCell>
                          <TableCell align='center' style={{fontWeight: "bold", fontSize: '1.2rem',width: '1000px' ,borderRight: "1px solid rgba(224, 224, 224, 1)"}}>{studentGPA}</TableCell>
                          <TableCell align='center' style={{fontWeight: "bold", fontSize: '1.2rem',width: '1000px' ,borderRight: "1px solid rgba(224, 224, 224, 1)"}}>Tổng số tín chỉ</TableCell>
                          <TableCell align='center' style={{fontWeight: "bold", fontSize: '1.2rem',width: '1000px' ,borderRight: "1px solid rgba(224, 224, 224, 1)"}}>{studentCredits}</TableCell>
                          
                          </TableContainer>
                      </Box>

                      <Stack>
                        <Typography variant="h1" gutterBottom></Typography>
                      </Stack>
      <Box 
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="0vh"
           >



              <TableContainer component={Paper}
                style={{
                  backgroundImage: 'url("/gradient.jpg")', 
                  backgroundSize: 'cover',
                  borderRadius: '10px',
                  width: '1250px', 
                  zIndex: 1// Độ rộng của Box

                }}>
                <PassScore data={dummyDataFinishPass} />
                </TableContainer>
            </Box>


                <Stack>
                  <Typography variant="h1" gutterBottom></Typography>
                </Stack>
             
      
      <Box 
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="0vh">

          <TableContainer component={Paper}
          style={{
            backgroundImage: 'url("/gradient.jpg")', 
            backgroundSize: 'cover',
            borderRadius: '10px',
            width: '1250px', 
            zIndex: 1// Độ rộng của Box

          }}>
          <Table>
            <TableHead ref={tableHeadRefFinishPass}>
              <TableRow>
                <TableCell align='center' style={{ fontWeight: "bold",borderRight: "1px solid rgba(224, 224, 224, 1)" }} >Mã MH</TableCell>
                <TableCell align='center' style={{ fontWeight: "bold",borderRight: "1px solid rgba(224, 224, 224, 1)" }}>Tên môn học</TableCell>
                <TableCell align='center' style={{ fontWeight: "bold",borderRight: "1px solid rgba(224, 224, 224, 1)" }}>Tín chỉ</TableCell>
                <TableCell align='center' style={{ fontWeight: "bold",borderRight: "1px solid rgba(224, 224, 224, 1)" }}>Trình độ</TableCell>
                <TableCell align='center' style={{ fontWeight: "bold",borderRight: "1px solid rgba(224, 224, 224, 1)" }}> Assignment</TableCell>
                <TableCell align='center' style={{ fontWeight: "bold",borderRight: "1px solid rgba(224, 224, 224, 1)" }}> Project</TableCell>
                <TableCell align='center' style={{ fontWeight: "bold",borderRight: "1px solid rgba(224, 224, 224, 1)" }}> Giữa Kì</TableCell>
                <TableCell align='center' style={{ fontWeight: "bold",borderRight: "1px solid rgba(224, 224, 224, 1)" }}> Cuối Kì</TableCell>
                <TableCell align='center' style={{ fontWeight: "bold",borderRight: "1px solid rgba(224, 224, 224, 1)" }}> Tổng Kết</TableCell>
                <TableCell align='center' style={{ fontWeight: "bold",borderRight: "1px solid rgba(224, 224, 224, 1)" }}> Đánh giá</TableCell>
                {/* Thêm các TableCell khác cho các cột */}
              </TableRow>
            </TableHead>
            <TableBody ref={tableBodyRefFinishPass}>
              {/* Lặp qua dữ liệu và tạo các TableRow chứa TableCell */}
              {dummyDataFinishPass.map((row) => (
                <TableRow key={row.id}>
                  <TableCell align='center' style={{width: '10px' ,borderRight: "1px solid rgba(224, 224, 224, 1)"}}>{row.MaMH}</TableCell>
                  <TableCell style={{width: '170px',borderRight: "1px solid rgba(224, 224, 224, 1)"}}>{row.TenMonHoc}</TableCell>
                  <TableCell align='center' style={{width: '50px',borderRight: "1px solid rgba(224, 224, 224, 1)"}}>{row.TinChi}</TableCell>
                  <TableCell align='center' style={{width: '70px',borderRight: "1px solid rgba(224, 224, 224, 1)"}}>{row.courseLevel}</TableCell>
                  <TableCell align='center' style={{width: '1px',borderRight: "1px solid rgba(224, 224, 224, 1)" }}>{row.assignmentScore}</TableCell>
                  <TableCell align='center' style={{width: '30px',borderRight: "1px solid rgba(224, 224, 224, 1)" }}>{row.projectScore}</TableCell>
                  <TableCell align='center' style={{width: '30px',borderRight: "1px solid rgba(224, 224, 224, 1)" }}>{row.midTermScore}</TableCell>
                  <TableCell align='center' style={{width: '50px',borderRight: "1px solid rgba(224, 224, 224, 1)" }}>{row.finalExamScore}</TableCell>
                  <TableCell align='center' style={{width: '50px',borderRight: "1px solid rgba(224, 224, 224, 1)" }}>{row.finalGrade}</TableCell>
                  <TableCell align='center' style={{fontWeight: "bold",width: '10px',borderRight: "1px solid rgba(224, 224, 224, 1)" }}><RegistButton style={{fontSize: '1.0rem',}} onClick={() => handleCourse_Level_Mark(row.MaMH)}>{row.DanhGia}</RegistButton></TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
          </TableContainer>
      </Box>
        </>
      )}

      {TableFlag==='FinishedFail'&&(
        <>
      <Box 
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="0vh">

          <TableContainer component={Paper}
          style={{
            backgroundImage: 'url("/gradient.jpg")', 
            backgroundSize: 'cover',
            borderRadius: '10px',
            width: '1250px', 
            zIndex: 1// Độ rộng của Box

          }}>
          <Table>
            <TableHead ref={tableHeadRefFinishFail}>
              <TableRow>
                <TableCell align='center' style={{ fontWeight: "bold",borderRight: "1px solid rgba(224, 224, 224, 1)" }} >Mã MH</TableCell>
                <TableCell align='center' style={{ fontWeight: "bold",borderRight: "1px solid rgba(224, 224, 224, 1)" }}>Tên môn học</TableCell>
                <TableCell align='center' style={{ fontWeight: "bold",borderRight: "1px solid rgba(224, 224, 224, 1)" }}>Tín chỉ</TableCell>
                <TableCell align='center' style={{ fontWeight: "bold",borderRight: "1px solid rgba(224, 224, 224, 1)" }}>Trình độ</TableCell>
                <TableCell align='center' style={{ fontWeight: "bold",borderRight: "1px solid rgba(224, 224, 224, 1)" }}> Assignment</TableCell>
                <TableCell align='center' style={{ fontWeight: "bold",borderRight: "1px solid rgba(224, 224, 224, 1)" }}> Project</TableCell>
                <TableCell align='center' style={{ fontWeight: "bold",borderRight: "1px solid rgba(224, 224, 224, 1)" }}> Giữa Kì</TableCell>
                <TableCell align='center' style={{ fontWeight: "bold",borderRight: "1px solid rgba(224, 224, 224, 1)" }}> Cuối Kì</TableCell>
                <TableCell align='center' style={{ fontWeight: "bold",borderRight: "1px solid rgba(224, 224, 224, 1)" }}> Tổng Kết</TableCell>
                <TableCell align='center' style={{ fontWeight: "bold",borderRight: "1px solid rgba(224, 224, 224, 1)" }}> Học lại</TableCell>
                {/* Thêm các TableCell khác cho các cột */}
              </TableRow>
            </TableHead>
            <TableBody ref={tableBodyRefFinishFail}>
              {/* Lặp qua dữ liệu và tạo các TableRow chứa TableCell */}
              {dummyDataFinishFail.map((row) => (
                <TableRow key={row.id}>
                  <TableCell align='center' style={{width: '10px' ,borderRight: "1px solid rgba(224, 224, 224, 1)"}}>{row.MaMH}</TableCell>
                  <TableCell style={{width: '170px',borderRight: "1px solid rgba(224, 224, 224, 1)"}}>{row.TenMonHoc}</TableCell>
                  <TableCell align='center' style={{width: '50px',borderRight: "1px solid rgba(224, 224, 224, 1)"}}>{row.TinChi}</TableCell>
                  <TableCell align='center' style={{width: '70px',borderRight: "1px solid rgba(224, 224, 224, 1)"}}>{row.courseLevel}</TableCell>
                  <TableCell align='center' style={{width: '1px',borderRight: "1px solid rgba(224, 224, 224, 1)" }}>{row.assignmentScore}</TableCell>
                  <TableCell align='center' style={{width: '30px',borderRight: "1px solid rgba(224, 224, 224, 1)" }}>{row.projectScore}</TableCell>
                  <TableCell align='center' style={{width: '30px',borderRight: "1px solid rgba(224, 224, 224, 1)" }}>{row.midTermScore}</TableCell>
                  <TableCell align='center' style={{width: '50px',borderRight: "1px solid rgba(224, 224, 224, 1)" }}>{row.finalExamScore}</TableCell>
                  <TableCell align='center' style={{width: '50px',borderRight: "1px solid rgba(224, 224, 224, 1)" }}>{row.finalGrade}</TableCell>
                  <TableCell align='center' style={{width: '10px',borderRight: "1px solid rgba(224, 224, 224, 1)" }}><RegistButton onClick={HandleGhiDanh}>Ghi Danh</RegistButton></TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
          </TableContainer>
      </Box>
        </>
      )}


      {sheetmarkCourse==='true'&&(

        <>
           <div
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(255, 255, 255, 0.2)', // Màu nền overlay (có thể điều chỉnh)
                  zIndex: 10,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backdropFilter: 'blur(8px)', // Sử dụng backdrop-filter để làm mờ nền
                }}
              />

              <div
                style={{
                  position: 'absolute',
                  border: '0px solid #380B61', // Viền nằm trong nút
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  backgroundImage: 'url("/gradient.jpg")',
                  backgroundSize: 'cover',
                  padding: '50px',
                  borderRadius: '10px',
                  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                  zIndex: 10,
                }}
              >
                <Stack>
                  <Typography style={{ fontWeight: 'bold' }} variant='h4' gutterBottom>Biểu đồ điểm</Typography>
                  <Typography variant='h3' gutterBottom></Typography>
                  <Typography style={{ }} variant='h5'>Phổ điểm của môn học</Typography>
                  <Typography variant='h1' gutterBottom></Typography>
                </Stack>

                <Box 
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="0vh">



                  <TableContainer component={Paper}
                    style={{
                      backgroundImage: 'url("/gradient.jpg")', 
                      backgroundSize: 'cover',
                      borderRadius: '10px',
                      width: '900px', 
                      zIndex: 1// Độ rộng của Box

                    }}>
                    <LevelScore data={dummyDataSheetMark} />
                    </TableContainer>
                </Box>

                <Box 
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="0vh">

                    <TableContainer component={Paper}
                    style={{
                      backgroundImage: 'url("/gradient.jpg")', 
                      backgroundSize: 'cover',
                      borderRadius: '10px',
                      width: '950px', 
                      zIndex: 1// Độ rộng của Box

                    }}>
                    <Table>
                      <TableHead ref={tableHeadRefSheetMark}>
                        <TableRow>
                          <TableCell align='center' style={{ fontWeight: "bold",borderRight: "1px solid rgba(224, 224, 224, 1)" }} >Mã MH</TableCell>
                          <TableCell align='center' style={{ fontWeight: "bold",borderRight: "1px solid rgba(224, 224, 224, 1)" }}>Tên môn học</TableCell>
                          <TableCell align='center' style={{ fontWeight: "bold",borderRight: "1px solid rgba(224, 224, 224, 1)" }}>Trình độ</TableCell>
                          <TableCell align='center' style={{ fontWeight: "bold" }}> Tổng Kết</TableCell>


                          {/* Thêm các TableCell khác cho các cột */}
                        </TableRow>
                      </TableHead>
                      <TableBody ref={tableBodyRefSheetMark}>
                        {/* Lặp qua dữ liệu và tạo các TableRow chứa TableCell */}
                        {dummyDataSheetMark.map((row) => (
                          <TableRow key={row.id}>
                            <TableCell align='center' style={{width: '10px' ,borderRight: "1px solid rgba(224, 224, 224, 1)"}}>{row.MaMH}</TableCell>
                            <TableCell style={{width: '170px',borderRight: "1px solid rgba(224, 224, 224, 1)"}}>{row.TenMonHoc}</TableCell>
                            <TableCell align='center' style={{width: '70px',borderRight: "1px solid rgba(224, 224, 224, 1)"}}>{row.courseLevel}</TableCell>
                            <TableCell align='center' style={{width: '1px'}}>{row.finalGrade}</TableCell>
             
                          

                            {/* Thêm các TableCell khác cho các cột */}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    </TableContainer>
                </Box>



                <IconButton
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    color: '#fff',
                  }}
                  onClick={() => handleCourse_Level_Mark_Close()}

                >
                  <CloseIcon />
                </IconButton> 
              </div>

        </>
      )}


          <Stack>
            <Typography variant="h1" gutterBottom></Typography>
          </Stack>
          <Stack>
            <Typography variant="h1" gutterBottom></Typography>
          </Stack>



</>
      ) : (
        // Render cảnh báo khi không có StudentUserID

        <Box align='center' direction='row' > 
        
          <Typography variant='h2' color='#FFFFFF' style={{ fontWeight: 'bold' }}>Error: Unauthenticated </Typography>
          <FunctionButton onClick={handleHomeClick}>Về trang Đăng Nhập</FunctionButton>

       </Box>
      )}

    </div>
  )
}

export default HocTap