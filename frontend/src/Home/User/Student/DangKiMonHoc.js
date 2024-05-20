import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SendIcon from '@mui/icons-material/Send'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import React, { useState, useEffect,useRef } from 'react';
import LoginIcon from '@mui/icons-material/Login';
import SchoolIcon from '@mui/icons-material/School';
import TextField from '@mui/material/TextField';
import {useNavigate}  from 'react-router-dom';
import { styled} from '@mui/material';
import axios from 'axios'; 
import * as xlsx from 'xlsx';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Grid from '@mui/material/Grid';
import LogoutIcon from '@mui/icons-material/Logout';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Tab } from '@mui/base';
import StarField from './star';
import StarExplosion from './Starbg'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import GetAppIcon from '@mui/icons-material/GetApp';
import EditIcon from '@mui/icons-material/Edit';


function ThoiKhoaBieu() {
  const navigate = useNavigate();
  const tableBodyRef = useRef(null);
  const tableHeadRef = useRef(null);
  const tableDKMHBodyRef = useRef(null);
  const tableDKMHHeadRef = useRef(null);
  const tableInfoBodyRef = useRef(null);
  const tableInfoHeadRef = useRef(null);
  const handleHomeClick = () => {
    // Hiển thị ô vuông khi bấm nút SignUp
      navigate('/home')
  };
  const [ErrorWarning, setErrorWarning] = useState(false);
  const [ErrorInfo, setErrorInfo] = useState('');

  const [SuccessWarning, setSuccessWarning] = useState(false);

  const [DeleteWarning, setDeleteWarning] = useState(false);
  const [DeleteInfo, setDeleteInfo] = useState('');

  const [DeleteSuccess, setDeleteSuccess] = useState(false);
 



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

 

  const [dummyData, setDummyData] = useState([]);


  function getCourseForm(studentId) {
   const baseURL = 'http://localhost:8080';
     const url = `${baseURL}/courses/getAvailable`;
  
           axios.get(url)
         .then(response => {
           if (response.data.status === 'success') {
             // Handle the successful response
             const allCourseData = response.data.data;
             console.log('allCourseData:', allCourseData); // Thêm dòng này
             updateTableData(allCourseData);
           } else {
             console.log('No course found:', response.data.message);
           }
         })
         .catch(error => {
           console.error('Error fetching course data:', error);
         });
   }
   function updateTableData(response) {
     // Create a new array to store the table rows
     const tableRows = [];
  
     // Check if the response has a 'data' property and it's an array
     if (response&&Array.isArray(response)) {
       // Iterate over the courses in the 'data' array
       response.forEach(course => {
         // Create a new row object for each course
         const row = {
           MaMH: course.courseId,
           TenMonHoc: course.courseName,
           isAvailable: course.isAvailable,
         };
  
         // Add the row to the tableRows array
         tableRows.push(row);
       });
     } else {
       console.log('Invalid response data');
     }
  
     // Update the component state with the new tableRows array
    setDummyData(tableRows);
   }



  const [dummyDataDKMH, setDummyDataDKMH] = useState([]);


  function getCourseFormDKMH(courseId, courseLevel,TenMonHoc) {
    const baseURL = 'http://localhost:8080';
    const url = `${baseURL}/coursetoregistration/by-course-and-level?&courseId=${courseId}&courseLevel=${courseLevel}`;
    console.log(courseId,courseLevel,TenMonHoc);
    axios.get(url)
      .then(responseDKMH => {
        if (responseDKMH.data.status === 'success') {
          // Xử lý phản hồi thành công
          console.log(courseId,courseLevel)
          const registrations = responseDKMH.data.data;
          //console.log('Registrations:', registrations);
          // Gọi hàm updateTableData với dữ liệu registrations
          updateTableDataDKMH(registrations,TenMonHoc,courseLevel);
        } else {
          console.log('Không tìm thấy đăng ký nào:', responseDKMH.data.message);
        }
      })
      .catch(error => {
        console.error('Lỗi khi lấy dữ liệu đăng ký:', error);
      });
  }

  function updateTableDataDKMH(responseDKMH,TenMonHoc,level) {
    // Create a new array to store the table rows
    const tableRowsDKMH = [];
  
    // Check if the response has a 'data' property and it's an array
    console.log(responseDKMH,"---",TenMonHoc)
    if (responseDKMH&&Array.isArray(responseDKMH)) {
      // Iterate over the courses in the 'data' array
      responseDKMH.forEach(courseDKMH => {
        // Create a new row object for each course
        const rowDKMH = {
          MaMH: courseDKMH.courseId,
          ID:courseDKMH.id,
          TenMonHoc: TenMonHoc,
          Level: level,
          Thu: courseDKMH.dayOfWeek,
          Tiet: courseDKMH.startPeriod +" - "+ courseDKMH.endPeriod,
          Gio: (courseDKMH.startPeriod+6) +"h - "+ (courseDKMH.endPeriod+6)+"h",
          SiSo: courseDKMH.numberOfStudent +" / "+ courseDKMH.maxRegist,
        };
  
        // Add the row to the tableRows array
        tableRowsDKMH.push(rowDKMH);
      });
    } else {
      console.log('Invalid response data');
    }
  
    // Update the component state with the new tableRows array
    setDummyDataDKMH(tableRowsDKMH);
  }


  const [dummyDataForm, setDummyDataForm] = useState([]);


  function getCourseFormForm() {
    console.log("hello -",);
    const baseURL = 'http://localhost:8080';
    const url = `${baseURL}/coursetoregistration/by-student-id?studentId=${StudentUserID}`;
    console.log(url)
    axios.get(url)
      .then(responseForm => {
        if (responseForm.data.status === 'success') {
          // Xử lý phản hồi thành công
          console.log("called",StudentUserID)
          const formData = responseForm.data.data;
          updateTableDataForm(formData);
        } else {
          console.log('Không tìm thấy đăng ký nào:', responseForm.data.message);
        }
      })
      .catch(error => {
        console.error('Lỗi khi lấy dữ liệu đăng ký:', error);
      });
  }

  function updateTableDataForm(formData) {
    // Create a new array to store the table rows
    const tableRowsForm = [];
    console.log(formData)
    // Check if the response has a 'data' property and it's an array
    if (formData&&Array.isArray(formData)) {
      // Iterate over the courses in the 'data' array
      formData.forEach(courseForm => {
        console.log("hello--1212",courseForm)


        const rowForm = {
          MaMH: courseForm.courseId,
          TenMonHoc: courseForm.courseName,
          ID: courseForm.id,
          Level: courseForm.courseLevel,
          Thu: courseForm.dayOfWeek,
          Tiet: courseForm.startPeriod +" - "+ courseForm.endPeriod,
          Gio: (courseForm.startPeriod+6) +"h - "+ (courseForm.endPeriod+6)+"h",
          SiSo: courseForm.numberOfStudent +" / "+ courseForm.maxRegist,
        };
  
        // Add the row to the tableRows array
        tableRowsForm.push(rowForm);
      });
    } else {
      console.log('Invalid response data');
    }
  
    // Update the component state with the new tableRows array
    setDummyDataForm(tableRowsForm);
  }





  const [TableFlag, setTableFlag]= useState("Courses");

  const handleReturn = (e) =>
  {
    setTableFlag("Courses");
  }

  const handleInfoCheck = (e) =>
  {
    getCourseFormForm();
    setTableFlag("ShowInfo");
  }

  const [maMH_save, setmaMH_save]=useState("");
  const [level_save,setlevel_save]=useState("");
  const [courseNameSave,setcourseNameSave]=useState("");



  const handleBEGINNERRegistButton = (maMH,TenMonHoc) => {
    return () => {
      //console.log(`Đăng kí môn học có mã: ${maMH} Trinh độ: BEGINNER`);
      setmaMH_save(maMH);
      setlevel_save("BEGINNER");
      setcourseNameSave(TenMonHoc);
      getCourseFormDKMH(maMH,'BEGINNER',TenMonHoc)
      setTableFlag("Registrations");
      // Thêm các xử lý khác tại đây nếu cần
    };
  };

  const handleINTERMEDIATERegistButton = (maMH,TenMonHoc) => {
    return () => {
      //console.log(`Đăng kí môn học có mã: ${maMH} Trinh độ: INTERMEDIATE`);
      setmaMH_save(maMH);
      setlevel_save("INTERMEDIATE");
      setcourseNameSave(TenMonHoc);
      getCourseFormDKMH(maMH,'INTERMEDIATE',TenMonHoc)
      setTableFlag("Registrations");
      // Thêm các xử lý khác tại đây nếu cần
    };
  };

  const handleADVANCEDRegistButton = (maMH,TenMonHoc) => {
    return () => {
      //console.log(`Đăng kí môn học có mã: ${maMH} Trinh độ: ADVANCED`);
      setmaMH_save(maMH);
      setlevel_save("ADVANCED");
      setcourseNameSave(TenMonHoc);
      getCourseFormDKMH(maMH,'ADVANCED',TenMonHoc)
      setTableFlag("Registrations");
      // Thêm các xử lý khác tại đây nếu cần
    };
  };


  const handleSuccessClose = () => {

    getCourseFormDKMH(maMH_save,level_save,courseNameSave);
    setSuccessWarning(false);
  }


  
  const handleUpdateTKB=() =>
  {
    getCourseForm(StudentUserID)
  }

  useEffect(() => {
    if (StudentUserID) {
      handleUpdateTKB();
    }
  }, [StudentUserID]);

  
  const exportToExcel = () => {
    const tableHead = tableInfoHeadRef.current.rows[0].cells;
    const tableBody = tableInfoBodyRef.current.rows;
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
    xlsx.writeFile(workbook, 'Ket qua dang ki mon hoc.xlsx');
  };

  const [confirmRegist,setConfirmRegist] = useState(false)



 




  const handleRegist = (ID)=>
  {
    GhiDanhFunc(ID);
  }

  function GhiDanhFunc(registrationId) {
    const baseURL = 'http://localhost:8080';
    const url = `${baseURL}/student/${registrationId}/registration/${StudentUserID}`;
    console.log("URL-",url)
    axios.post(url)
      .then(response => {
        // Xử lý phản hồi thành công từ backend
        if (response.data.status === 'success') {
          // Xử lý phản hồi thành công
          setSuccessWarning(true);
        } else {
          console.log('Không tìm thấy đăng ký nào:', response.data.message);
        }
        // Có thể hiển thị thông báo hoặc xử lý dữ liệu tùy theo yêu cầu
      })
      .catch(error => {
        // Xử lý lỗi nếu có
        console.log('Error:', error);
        setErrorWarning(true);
        setErrorInfo(error.response.data.message)
        // Có thể hiển thị thông báo lỗi cho người dùng
      });
  }
  



  const handleDelete = (id) => {
    DeleteFunc(id);
  }

  const DeleteFunc = (ID) =>
  {
    const baseURL = 'http://localhost:8080';
    const url = `${baseURL}/student/${ID}/cancel/${StudentUserID}`;
    console.log("URL-",url)
    axios.post(url)
      .then(response => {
        // Xử lý phản hồi thành công từ backend
        if (response.data.status === 'success') {
          // Xử lý phản hồi thành công
          setDeleteSuccess(true);
        } else {
          console.log('Không tìm thấy đăng ký nào:', response.data.message);
        }
        // Có thể hiển thị thông báo hoặc xử lý dữ liệu tùy theo yêu cầu
      })
      .catch(error => {
        // Xử lý lỗi nếu có
        console.log('Error:', error);
        setDeleteWarning(true);
        setDeleteInfo(error.response.data.message)
        // Có thể hiển thị thông báo lỗi cho người dùng
      });
  }


  const handleDeleteSuccess = (e) =>
  {
    setDeleteSuccess(false)
    setTableFlag("Courses")
    getCourseFormForm();
    setTableFlag("ShowInfo")
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
          }}> Đăng kí môn học </Typography>
        </Box>

       


          {TableFlag!='Courses'&&(
              <RegistButton style={{
                width: '250px', // Độ rộng của Box
                height: '50px', 
                fontSize: '1.0rem', // Kích thước của nút // Khoảng cách so với mép màn hình bên phải
                borderRadius: '10px', // Bo tròn góc của viền
                justifyContent: 'center', // Căn chữ theo chiều ngang vào giữa,
                alignItems: 'center', 
                fontWeight: 'bold',
                textTransform: 'none',
                position: 'relative', // Thiết lập position để có thể dịch chuyển
                left: '120px', // Dịch sang phải 100px
                top: '-10px',
                }}
              onClick={handleReturn}> <KeyboardDoubleArrowLeftOutlinedIcon/> <Typography paddingLeft={0.8} ></Typography>Về trang chọn môn</RegistButton>)}
            {TableFlag!='ShowInfo'&&(
              <RegistButton style={{
                width: '250px', // Độ rộng của Box
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
              onClick={handleInfoCheck}> <EventNoteOutlinedIcon/> <Typography paddingLeft={0.8} ></Typography>Kiểm tra phiếu đăng kí</RegistButton>
            )}
            {TableFlag=='ShowInfo'&&(
              <RegistButton style={{
                width: '150px', // Độ rộng của Box
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
              onClick={exportToExcel}> <GetAppIcon/> <Typography paddingLeft={0.8} ></Typography>Xuất Excel</RegistButton>
            )}
            

          

      </Stack>
            

      <Box 
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="0vh"
      >


        {TableFlag==='Courses'&&(
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
                    <TableCell align='center' style={{ fontWeight: "bold",borderRight: "1px solid rgba(224, 224, 224, 1)" }} colSpan={3}>Đăng kí</TableCell>
                  </TableRow>
                
            
              
            </TableHead>
            <TableBody ref={tableBodyRef}>

              {dummyData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell align='center' style={{width: '10px' ,borderRight: "1px solid rgba(224, 224, 224, 1)"}}>{row.MaMH}</TableCell>
                  <TableCell style={{width: '200px',borderRight: "1px solid rgba(224, 224, 224, 1)"}}>{row.TenMonHoc}</TableCell>
                  <TableCell align='center' style={{width: '1px',borderRight: "1px solid rgba(224, 224, 224, 1)",}}>{(row.isAvailable)?(<RegistButton onClick={() => handleBEGINNERRegistButton(row.MaMH,row.TenMonHoc)()}>BEGINNER</RegistButton>):("No")}</TableCell>
                  <TableCell align='center' style={{width: '1px',borderRight: "1px solid rgba(224, 224, 224, 1)",}}>{(row.isAvailable)?(<RegistButton onClick={() => handleINTERMEDIATERegistButton(row.MaMH,row.TenMonHoc)()}>INTERMEDIATE</RegistButton>):("No")}</TableCell>           
                  <TableCell align='center' style={{width: '1px',borderRight: "1px solid rgba(224, 224, 224, 1)",}}>{(row.isAvailable)?(<RegistButton onClick={() => handleADVANCEDRegistButton(row.MaMH,row.TenMonHoc)()}>ADVANCED</RegistButton>):("No")}</TableCell>


                  {/* Thêm các TableCell khác cho các cột */}
                </TableRow>
              ))}


            </TableBody>
          </Table>
          </TableContainer>
        )
        }
        {TableFlag==='Registrations' && (
          
            <TableContainer component={Paper}
            style={{
              backgroundImage: 'url("/gradient.jpg")', 
              backgroundSize: 'cover',
              borderRadius: '10px',
              width: '1250px', 
              zIndex: 1,
      

            }}>

            <Table>
              <TableHead ref={tableDKMHHeadRef}>
                
          
                    <TableRow>
                      <TableCell align='center' style={{ fontWeight: "bold",borderRight: "1px solid rgba(224, 224, 224, 1)" }} >Mã MH</TableCell>
                      <TableCell align='center' style={{ fontWeight: "bold",borderRight: "1px solid rgba(224, 224, 224, 1)" }}>Tên môn học</TableCell>
                      <TableCell align='center' style={{ fontWeight: "bold",borderRight: "1px solid rgba(224, 224, 224, 1)" }}>Trình độ</TableCell>
                      <TableCell align='center' style={{ fontWeight: "bold",borderRight: "1px solid rgba(224, 224, 224, 1)" }}>Thứ</TableCell>
                      <TableCell align='center' style={{ fontWeight: "bold",borderRight: "1px solid rgba(224, 224, 224, 1)" }}>Tiết học</TableCell>
                      <TableCell align='center' style={{ fontWeight: "bold",borderRight: "1px solid rgba(224, 224, 224, 1)" }}>Giờ học</TableCell>
                      <TableCell align='center' style={{ fontWeight: "bold",borderRight: "1px solid rgba(224, 224, 224, 1)" }}>Sĩ số</TableCell>
                      <TableCell align='center' style={{ fontWeight: "bold",borderRight: "1px solid rgba(224, 224, 224, 1)" }}>Đăng kí</TableCell>
                    </TableRow>
                  
              
                
              </TableHead>
              <TableBody ref={tableDKMHBodyRef}>

                {dummyDataDKMH.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell align='center' style={{width: '10px' ,borderRight: "1px solid rgba(224, 224, 224, 1)"}}>{row.MaMH}</TableCell>
                    <TableCell style={{width: '200px',borderRight: "1px solid rgba(224, 224, 224, 1)"}}>{row.TenMonHoc}</TableCell>
                    <TableCell align='center' style={{width: '10px' ,borderRight: "1px solid rgba(224, 224, 224, 1)"}}>{row.Level}</TableCell>
                    <TableCell align='center' style={{width: '10px' ,borderRight: "1px solid rgba(224, 224, 224, 1)"}}>{row.Thu}</TableCell>
                    <TableCell align='center' style={{width: '10px' ,borderRight: "1px solid rgba(224, 224, 224, 1)"}}>{row.Tiet}</TableCell>
                    <TableCell align='center' style={{width: '40px' ,borderRight: "1px solid rgba(224, 224, 224, 1)"}}>{row.Gio}</TableCell>
                    <TableCell align='center' style={{width: '10px' ,borderRight: "1px solid rgba(224, 224, 224, 1)"}}>{row.SiSo}</TableCell>
                    <TableCell align='center' style={{width: '1px',borderRight: "1px solid rgba(224, 224, 224, 1)",}}><RegistButton onClick={() => handleRegist(row.ID)}>Ghi danh</RegistButton></TableCell>

                    {/* Thêm các TableCell khác cho các cột */}
                  </TableRow>
                ))}


              </TableBody>
            </Table>
            </TableContainer>

        )}

        {TableFlag==='ShowInfo' && (
          
          <TableContainer component={Paper}
          style={{
            backgroundImage: 'url("/gradient.jpg")', 
            backgroundSize: 'cover',
            borderRadius: '10px',
            width: '1250px', 
            zIndex: 1,
    

          }}>

          <Table>
            <TableHead ref={tableInfoHeadRef}>
              
        
                  <TableRow>
                    <TableCell align='center' style={{ fontWeight: "bold",borderRight: "1px solid rgba(224, 224, 224, 1)" }} >Mã MH</TableCell>
                    <TableCell align='center' style={{ fontWeight: "bold",borderRight: "1px solid rgba(224, 224, 224, 1)" }}>Tên môn học</TableCell>
                    <TableCell align='center' style={{ fontWeight: "bold",borderRight: "1px solid rgba(224, 224, 224, 1)" }}>Mã phiếu</TableCell>
                    <TableCell align='center' style={{ fontWeight: "bold",borderRight: "1px solid rgba(224, 224, 224, 1)" }}>Trình độ</TableCell>
                    <TableCell align='center' style={{ fontWeight: "bold",borderRight: "1px solid rgba(224, 224, 224, 1)" }}>Thứ</TableCell>
                    <TableCell align='center' style={{ fontWeight: "bold",borderRight: "1px solid rgba(224, 224, 224, 1)" }}>Tiết học</TableCell>
                    <TableCell align='center' style={{ fontWeight: "bold",borderRight: "1px solid rgba(224, 224, 224, 1)" }}>Giờ học</TableCell>
                    <TableCell align='center' style={{ fontWeight: "bold",borderRight: "1px solid rgba(224, 224, 224, 1)" }}>Sĩ số</TableCell>
                    <TableCell align='center' style={{ fontWeight: "bold",borderRight: "1px solid rgba(224, 224, 224, 1)" }}>Huỷ phiếu</TableCell>
                  </TableRow>
                
            
              
            </TableHead>

            <TableBody ref={tableInfoBodyRef}>

              {dummyDataForm.map((row) => (
                <TableRow key={row.id}>
                  <TableCell align='center' style={{width: '20px' ,borderRight: "1px solid rgba(224, 224, 224, 1)"}}>{row.MaMH}</TableCell>
                  <TableCell style={{width: '250px',borderRight: "1px solid rgba(224, 224, 224, 1)"}}>{row.TenMonHoc}</TableCell>
                  <TableCell align='center' style={{width: '50px' ,borderRight: "1px solid rgba(224, 224, 224, 1)"}}>{row.ID}</TableCell>
                  <TableCell align='center' style={{width: '15px' ,borderRight: "1px solid rgba(224, 224, 224, 1)"}}>{row.Level}</TableCell>
                  <TableCell align='center' style={{width: '25px' ,borderRight: "1px solid rgba(224, 224, 224, 1)"}}>{row.Thu}</TableCell>
                  <TableCell align='center' style={{width: '50px' ,borderRight: "1px solid rgba(224, 224, 224, 1)"}}>{row.Tiet}</TableCell>
                  <TableCell align='center' style={{width: '50px' ,borderRight: "1px solid rgba(224, 224, 224, 1)"}}>{row.Gio}</TableCell>
                  <TableCell align='center' style={{width: '50px' ,borderRight: "1px solid rgba(224, 224, 224, 1)"}}>{row.SiSo}</TableCell>
                  <TableCell align='center' style={{width: '10px' ,borderRight: "1px solid rgba(224, 224, 224, 1)"}}><RegistButton onClick={()=>handleDelete(row.ID)}><DeleteIcon/></RegistButton></TableCell>

                  {/* Thêm các TableCell khác cho các cột */}
                </TableRow>
              ))}


            </TableBody>
          </Table>
          </TableContainer>

      )}
        
        {ErrorWarning&&
        (
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
                <Typography style={{ fontWeight: 'bold' }} variant='h4' gutterBottom>Error !</Typography>
                <Typography style={{  }} variant='h5'>{ErrorInfo}</Typography>
              </Stack>
              <IconButton
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  color: '#fff',
                }}
                onClick={() => setErrorWarning(false)}
              >
                <CloseIcon />
              </IconButton>
            </div>
          </>

        )
        }

        {SuccessWarning&&
        (
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
                <Typography style={{ fontWeight: 'bold' }} variant='h4' gutterBottom>Thông Báo !</Typography>
                <Typography variant='h3' gutterBottom></Typography>
                <Typography style={{ }} variant='h5'>Bạn đã ghi danh thành công</Typography>
              </Stack>
              <IconButton
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  color: '#fff',
                }}
                onClick={() => handleSuccessClose()}
              >
                <CloseIcon />
              </IconButton>
            </div>
          </>

        )
        }

        {DeleteWarning&&
          (
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
                  <Typography style={{ fontWeight: 'bold' }} variant='h4' gutterBottom>Error !</Typography>
                  <Typography variant='h3' gutterBottom></Typography>
                  <Typography style={{ }} variant='h5'>{DeleteInfo}</Typography>
                </Stack>
                <IconButton
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    color: '#fff',
                  }}
                  onClick={() => setDeleteWarning(false)}
                >
                  <CloseIcon />
                </IconButton>
              </div>
            </>

          )
          }

        {DeleteSuccess&&
          (
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
                  <Typography style={{ fontWeight: 'bold' }} variant='h4' gutterBottom>Thông Báo !</Typography>
                  <Typography variant='h3' gutterBottom></Typography>
                  <Typography style={{ }} variant='h5'>Bạn đã huỷ đăng kí thành công</Typography>
                </Stack>
                <IconButton
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    color: '#fff',
                  }}
                  onClick={() => handleDeleteSuccess()}

                >
                  <CloseIcon />
                </IconButton>
              </div>
            </>

          )
          }




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