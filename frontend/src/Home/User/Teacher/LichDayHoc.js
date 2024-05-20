import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import React, { useState, useEffect ,useRef} from 'react';
import LoginIcon from '@mui/icons-material/Login';
import SchoolIcon from '@mui/icons-material/School';
import TextField from '@mui/material/TextField';
import {useNavigate}  from 'react-router-dom';
import { styled} from '@mui/material';
import axios from 'axios'; 
import Grid from '@mui/material/Grid';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
// import StudentInfo from './StudentInfo';
import LogoutIcon from '@mui/icons-material/Logout';
import Card from '@mui/material/Card';
import  CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import StarExplosion from './Starbg'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import * as xlsx from 'xlsx';
import GetAppIcon from '@mui/icons-material/GetApp';
function Teachers()
{
  const handleHomeClick = () => {
    // Hiển thị ô vuông khi bấm nút SignUp
      navigate('/home/teachers')
  };

    const navigate = useNavigate();

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


    const handleTeacherInfo = (e) => {
        navigate('/home/teachers/TeacherInFo')
    }
    
    const handleLogOut = (e) =>
    {
      localStorage.removeItem('TeacherUserID');
      localStorage.removeItem('TeacherName');
      navigate('/home')
    }
    // Trong trang làm việc
    const TeacherUserID = localStorage.getItem('TeacherUserID');
    // const TeacherName =localStorage.getItem("TeacherName");
    const[TeacherName, setTeacherName] = useState('');
    // const TeacherName =localStorage.getItem("TeacherUserName");
    const fetchTeacher = async () => {
        try {
          console.log(TeacherUserID)
          const response = await axios.get(`http://localhost:8080/teacher/${TeacherUserID}`);
          const { data } = response.data;
          setTeacherName(data.name);
          // setTeacherUserID(data.id);
        } catch (error) {
          console.error('Error fetching student data:',);
        }
      };
      const tableBodyRef = useRef(null);
      const tableHeadRef = useRef(null);
      const [dummyData, setDummyData] = useState([]);
      const fetchLichDay = async () => {
        try {
          console.log(TeacherUserID)
          const response = await axios.get(`http://localhost:8080/courseclass/getClassOfTeacher?teacherId=${TeacherUserID}`);
          const tableRows = [];
          for (const classData of response.data.data) {
            const tinChi = classData.courseLevel === "BEGINNER" ? "3" : "4";
            const row = {
              IdMonHoc: classData.id,
              MaMH: classData.courseId,
              TenMonHoc: classData.courseName,
              Level: classData.courseLevel,
              TinChi: tinChi,
              Thu: classData.dayOfWeek,
              Tiet: `${classData.startPeriod} - ${classData.endPeriod}`,
              Gio: `${classData.startPeriod + 6}h - ${classData.endPeriod + 6}h`,
              studentIds  : classData.studentIds,
            };  
            tableRows.push(row);
          }
          setDummyData(tableRows);
          console.log(tableRows);
        } catch (error) {
          console.error('Error fetching student data:',);
        }
      };
      const handleThanhVien = (studentIds,IdMonHoc) => {
        const encodedStudentIds = encodeURIComponent(JSON.stringify(studentIds));
        navigate(`/home/teachers/DangKiDay?studentIds=${encodedStudentIds}&IdMonHoc=${IdMonHoc}`);
      };
      
    useEffect(() => {
        if (TeacherUserID) 
        {
          fetchTeacher();
          fetchLichDay();
        }
      }, [TeacherUserID]);
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
        xlsx.writeFile(workbook, 'DanhSachLop.xlsx');
      };
      

    return(
        <div 
        style={{ 
          backgroundImage: 'url("/bg1.jpg")', // Sử dụng đường dẫn từ thư mục public
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          zIndex: 5, 
        }}
          >

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
                {TeacherUserID ? (
<>
        <AppBar position='static'>
            <Toolbar  className='custom-toolbar' sx={{ bgcolor: 'transparent' ,}}>
            <img src="/Hogwarts.png" alt="Icon" width="80" height="50" />
                <Typography variant='h5' style={{ fontWeight: 'bold' }} align='left' sx={{flexGrow:11} }  > HCM Hogwarts  University </Typography>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ flexGrow: 100 }}> 
                        <Stack direction="row">
                            <FunctionButton onClick={handleHomeClick}>Về trang trước</FunctionButton>
                        </Stack>
                      </Stack>

                <Stack direction={'row'}>
                    <FunctionButton onClick={handleTeacherInfo}>
                    <AccountCircleIcon fontSize= 'large'  />
                    <Typography paddingLeft={1} ></Typography>
                    Teacher: {TeacherName}  -   ID: {TeacherUserID.toString().padStart(5, '0')}
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
          }}> Lịch Dạy Học</Typography>
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
          onClick={exportToExcel}> <GetAppIcon /><Typography paddingLeft={0.7} ></Typography>Xuất Excel</Button>
        </Stack>
       
          {/* <Button style={{
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
          onClick={exportToExcel}> <GetAppIcon /><Typography paddingLeft={0.8} ></Typography>Xuất Excel</Button> */}


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

          }}
          >
          <Table>
            <TableHead ref={tableHeadRef}>
              <TableRow>
                <TableCell align='center' style={{ fontWeight: "bold", borderRight: "1px solid rgba(224, 224, 224, 1)", width: "100px" }}>Mã MH</TableCell>
                <TableCell align='center' style={{ fontWeight: "bold", borderRight: "1px solid rgba(224, 224, 224, 1)", width: "200px" }}>Tên môn học</TableCell>
                <TableCell align='center' style={{ fontWeight: "bold", borderRight: "1px solid rgba(224, 224, 224, 1)", width: "100px" }}>Tín chỉ</TableCell>
                <TableCell align='center' style={{ fontWeight: "bold", borderRight: "1px solid rgba(224, 224, 224, 1)", width: "100px" }}>Trình độ</TableCell>
                <TableCell align='center' style={{ fontWeight: "bold", borderRight: "1px solid rgba(224, 224, 224, 1)", width: "100px" }}>Thứ</TableCell>
                <TableCell align='center' style={{ fontWeight: "bold", borderRight: "1px solid rgba(224, 224, 224, 1)", width: "100px" }}>Tiết</TableCell>
                <TableCell align='center' style={{ fontWeight: "bold", borderRight: "1px solid rgba(224, 224, 224, 1)", width: "100px" }}>Giờ</TableCell>
                <TableCell align='center' style={{ fontWeight: "bold", borderRight: "1px solid rgba(224, 224, 224, 1)", width: "150px" }}>Thành viên</TableCell>
                {/* Thêm các TableCell khác cho các cột */}
              </TableRow>
            </TableHead>
            <TableBody ref={tableBodyRef}>
              {/* Lặp qua dữ liệu và tạo các TableRow chứa TableCell */}
              {dummyData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell align='center' style={{width: '10px' ,borderRight: "1px solid rgba(224, 224, 224, 1)"}}>{row.MaMH}</TableCell>
                  <TableCell style={{width: '230px',borderRight: "1px solid rgba(224, 224, 224, 1)"}}>{row.TenMonHoc}</TableCell>
                  <TableCell align='center' style={{width: '20px',borderRight: "1px solid rgba(224, 224, 224, 1)"}}>{row.TinChi}</TableCell>
                  <TableCell align='center' style={{width: '20px',borderRight: "1px solid rgba(224, 224, 224, 1)"}}>{row.Level}</TableCell>
                  <TableCell align='center' style={{width: '20px',borderRight: "1px solid rgba(224, 224, 224, 1)" }}>{row.Thu}</TableCell>
                  <TableCell align='center' style={{width: '20px',borderRight: "1px solid rgba(224, 224, 224, 1)" }}>{row.Tiet}</TableCell>
                  <TableCell align='center' style={{width: '50px',borderRight: "1px solid rgba(224, 224, 224, 1)" }}>{row.Gio}</TableCell>
                  <TableCell align='center' style={{width: '50px',borderRight: "1px solid rgba(224, 224, 224, 1)" }}>
                    <RegistButton style={{fontSize:'0.9rem'}} onClick={() => handleThanhVien(row.studentIds,row.IdMonHoc)}>
                      Xem chi tiết
                    </RegistButton>
          
                  </TableCell>
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

      <Box align='center'  direction='row' > 
      
        <Typography variant='h2' color='#FFFFFF' style={{ fontWeight: 'bold' }}>Error: Unauthenticated </Typography>
        <FunctionButton onClick={handleHomeClick}>Về trang Đăng Nhập</FunctionButton>

    </Box>
    )}
    </div>             
        )
}
export default Teachers
