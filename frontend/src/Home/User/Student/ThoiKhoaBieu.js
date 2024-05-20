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

function ThoiKhoaBieu() {
  const navigate = useNavigate();
  const tableBodyRef = useRef(null);
  const tableHeadRef = useRef(null);
  const handleHomeClick = () => {
    // Hiển thị ô vuông khi bấm nút SignUp
      navigate('/home')
  };

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

  // const row_num=3;

  // const dummyData = Array.from({ length: row_num }, (_, index) => ({
  //   id: index + 1,
  //   // column1: `Value 1-${index + 1}`,
  //   // column2: `Value 2-${index + 1}`,
  //   MaMH: `${index+1}`,
  //   TenMonHoc: "Lap Trinh Nang Cao",
  //   TinChi: 3,
  //   Thu: "Hai",
  //   Tiet: "8-9",
  //   GioHoc: "13-15",
  //   PhongHoc: "1",
  //   TuanHoc: "1-2-3-4-5-6-7-8-9-10", 


  // }));



  // async function getThoiKhoaBieu(Student_ID) {
    
  //   try {
  //     const response = await axios.post('http://localhost:8080/', null, {
  //       params: {
  //         Student_ID
  //       }
  //     });
  //     const { status, message, data } = response.data;
  //     if (status === 'success') {
  //       return { success: true, message, data };
  //     } else {
  //       throw new Error(message);
  //     }
  //   } catch (error) {
  //     console.log("fail")
  //     if (error.response) {
  //       // Lỗi từ phía máy chủ
  //       const { status, data } = error.response;
  //       if (status === 404) {
  //         // Xử lý lỗi 404 (Not Found)
  //         console.error('User not found:', data.message);
  //       } else if (status === 401) {
  //         // Xử lý lỗi 401 (Unauthorized)
  //         console.error('Authentication failed:', data.message);
  //       } else {
  //         // Xử lý lỗi khác
  //         console.error('Error:', data.message);
  //       }
  //     } else if (error.request) {
  //       // Lỗi khi gửi yêu cầu
  //       console.error('Request error:', error.message);
  //     } else {
  //       // Lỗi khác
  //       console.error('Error:', error.message);
  //     }
  
  //     return { success: false, message: error.message };
  //   }
  // }

  const [dummyData, setDummyData] = useState([]);


  function getWeeklySchedule(studentId) {
    const baseURL = 'http://localhost:8080';
    const url = `${baseURL}/student/${studentId}/weekly-schedule`;
  
    axios.get(url)
      .then(response => {
        if (response.data.status === 'success') {
          // Handle the successful response
          const weeklyScheduleData = response.data.data;
          // Update the table data with weeklyScheduleData
          updateTableData(weeklyScheduleData);
        } else {
          console.log('No schedule found:', response.data.message);
        }
      })
      .catch(error => {
        console.error('Error fetching weekly schedule:', error);
      });
  }


function updateTableData(weeklyScheduleData) {
  // Create a new array to store the table rows
  console.log(weeklyScheduleData);
  const tableRows = [];

  // Iterate over the weeklyScheduleData
  for (const [day, courses] of Object.entries(weeklyScheduleData)) {
    courses.forEach(course => {
      // Create a new row object for each course
      let tinChi;
      if (course.courseLevel==="BEGINNER") tinChi="3"
      else{
        tinChi="4"
      }
      console.log(course.courseName)
      const row = {
        TeacherID: course.teacherId, 
        MaMH: course.courseId,
        TenMonHoc: course.courseName,
        Level: course.courseLevel,
        TinChi: tinChi,
        Thu: (day),
        Tiet: course.startPeriod +" - "+ course.endPeriod,
        Gio: (course.startPeriod+6) +"h - "+ (course.endPeriod+6)+"h"
      };

      // Add the row to the tableRows array
      tableRows.push(row);
    });
  }

  // Update the component state with the new tableRows array
  setDummyData(tableRows);
}

  const handleUpdateTKB=() =>
  {
    getWeeklySchedule(StudentUserID)
  }

  useEffect(() => {
    if (StudentUserID) {
      handleUpdateTKB();
    }
  }, [StudentUserID]);

  const exportToExcel = () => {
    const tableHead = tableHeadRef.current.rows[0].cells;
    const tableBody = tableBodyRef.current.rows;
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
    xlsx.writeFile(workbook, 'thoi-khoa-bieu.xlsx');
  };



  
  
  return (
    <div style={{ 
      backgroundImage: 'url("/bg1.jpg")', // Sử dụng đường dẫn từ thư mục public
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
      zIndex: 5, 

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
          }}> Thời Khoá Biểu</Typography>
        </Box>

       
          <Button style={{
              width: '250px', // Độ rộng của Box
              height: '50px', 
              fontSize: '1.2rem', // Kích thước của nút // Khoảng cách so với mép màn hình bên phải
              color: '#380B61', // Màu chữ của nút
              backgroundImage: 'url("/gradient.jpg")', 
              backgroundSize: 'cover',// Màu nền của nút
              borderRadius: '10px', // Bo tròn góc của viền
              justifyContent: 'center', // Căn chữ theo chiều ngang vào giữa,
              alignItems: 'center', 
              fontWeight: 'bold',
              textTransform: 'none',
              position: 'relative', // Thiết lập position để có thể dịch chuyển
              left: '150px', // Dịch sang phải 100px
              top: '-10px',
            
            }}
          onClick={exportToExcel}> <GetAppIcon /><Typography paddingLeft={0.8} ></Typography>Xuất Excel</Button>

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
            <TableHead ref={tableHeadRef}>
              <TableRow>
                <TableCell align='center' style={{ fontWeight: "bold",borderRight: "1px solid rgba(224, 224, 224, 1)" }} >Mã MH</TableCell>
                <TableCell align='center' style={{ fontWeight: "bold",borderRight: "1px solid rgba(224, 224, 224, 1)" }}>Tên môn học</TableCell>
                <TableCell align='center' style={{ fontWeight: "bold",borderRight: "1px solid rgba(224, 224, 224, 1)" }}>ID giảng viên</TableCell>
                <TableCell align='center' style={{ fontWeight: "bold",borderRight: "1px solid rgba(224, 224, 224, 1)" }}>Tín chỉ</TableCell>
                <TableCell align='center' style={{ fontWeight: "bold",borderRight: "1px solid rgba(224, 224, 224, 1)" }}>Trình độ</TableCell>
                <TableCell align='center' style={{ fontWeight: "bold",borderRight: "1px solid rgba(224, 224, 224, 1)" }}>Thứ</TableCell>
                <TableCell align='center' style={{ fontWeight: "bold",borderRight: "1px solid rgba(224, 224, 224, 1)" }}>Tiết</TableCell>
                <TableCell align='center' style={{ fontWeight: "bold",borderRight: "1px solid rgba(224, 224, 224, 1)" }}>Giờ</TableCell>
                {/* Thêm các TableCell khác cho các cột */}
              </TableRow>
            </TableHead>
            <TableBody ref={tableBodyRef}>
              {/* Lặp qua dữ liệu và tạo các TableRow chứa TableCell */}
              {dummyData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell align='center' style={{width: '10px' ,borderRight: "1px solid rgba(224, 224, 224, 1)"}}>{row.MaMH}</TableCell>
                  <TableCell style={{width: '230px',borderRight: "1px solid rgba(224, 224, 224, 1)"}}>{row.TenMonHoc}</TableCell>
                  <TableCell align='center' style={{width: '50px',borderRight: "1px solid rgba(224, 224, 224, 1)"}}>{row.TeacherID}</TableCell>
                  <TableCell align='center' style={{width: '20px',borderRight: "1px solid rgba(224, 224, 224, 1)"}}>{row.TinChi}</TableCell>
                  <TableCell align='center' style={{width: '20px',borderRight: "1px solid rgba(224, 224, 224, 1)"}}>{row.Level}</TableCell>
                  <TableCell align='center' style={{width: '20px',borderRight: "1px solid rgba(224, 224, 224, 1)" }}>{row.Thu}</TableCell>
                  <TableCell align='center' style={{width: '20px',borderRight: "1px solid rgba(224, 224, 224, 1)" }}>{row.Tiet}</TableCell>
                  <TableCell align='center' style={{width: '50px',borderRight: "1px solid rgba(224, 224, 224, 1)" }}>{row.Gio}</TableCell>
                  {/* Thêm các TableCell khác cho các cột */}
                </TableRow>
              ))}
              
            </TableBody>
          </Table>
          </TableContainer>
      </Box>
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

export default ThoiKhoaBieu