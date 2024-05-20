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
import GetAppIcon from '@mui/icons-material/GetApp';
import StarExplosion from './Starbg'
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import EditNoteIcon from '@mui/icons-material/EditNote';
import CancelIcon from '@mui/icons-material/Cancel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
function ThoiKhoaBieu() {

const SearchLabel = () => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
        <span></span>
    </div>
    );
  const navigate = useNavigate();
  const tableBodyRef = useRef(null);
  const tableHeadRef = useRef(null);
  const handleHomeClick = () => {
    // Hiển thị ô vuông khi bấm nút SignUp
      navigate('/home')
  };
  const handleRefresh = (e)=>
  {
    setShowForm(false);
  }
  const [DeleteSuccess, setDeleteSuccess] = useState(false);
 
  const [SuccessWarning, setSuccessWarning] = useState(false);

  const [DeleteWarning, setDeleteWarning] = useState(false);
  const [DeleteInfo, setDeleteInfo] = useState('');

  const [successCreateCourse,SetsuccessCreateCourse]=useState(false);


  const AdminUserID = localStorage.getItem('AdminUserID');
  const handleStudentHome = () =>
  {
    navigate('/home/admin')
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
const CancelButton = styled (Button)
({
    fontSize: '0.8rem', // Kích thước của nút
    color: '#FFFFFF', // Màu chữ của nút
    borderRadius: '10px', // Bo tròn góc của viền
    padding: '10px 10px',
    fontWeight: 'bold',
    textTransform: 'none',
    '&: hover': { backgroundColor: '#A95FE5'}
})
  const handleLogOut = (e) =>
  {
  localStorage.removeItem('AdminUserID');
  localStorage.removeItem('AdminUserID');
  navigate('/home')
  }




  const [dummyData, setDummyData] = useState([]);


  function getWeeklySchedule() {
    const baseURL = 'http://localhost:8080';
    const url = `${baseURL}/courses/getAll`;
  
    axios.get(url)
      .then(response => {
        if (response.data.status === 'success') {
          // Handle the successful response
          const coursesData = response.data.data;
          console.log(coursesData)
          // Update the table data with weeklyScheduleData
          updateTableData(coursesData);
        } else {
          console.log('No schedule found:', response.data.message);
        }
      })
      .catch(error => {
        console.error('Error fetching weekly schedule:', error);
      });
  }


function updateTableData(response) {
  // Create a new array to store the table rows
  console.log(response);
  const tableRows = [];

  // Iterate over the weeklyScheduleData
        if (response&&Array.isArray(response)) {
            // Iterate over the courses in the 'data' array
            response.forEach(course => {
            // Create a new row object for each course
            const row = {
                MaMH: course.courseId,
                TenMonHoc: course.courseName,
                classDays: course.classDays.join('  ___  ') ,
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

  const handleUpdateTKB=() =>
  {
    getWeeklySchedule(AdminUserID)
  }

  useEffect(() => {
    if (AdminUserID) {
      handleUpdateTKB();
    }
  }, [AdminUserID]);

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
    xlsx.writeFile(workbook, 'DanhSachMonHoc.xlsx');
  };


  const handleDelete = (courseId) => {
    DeleteFunc(courseId);
  }

  const DeleteFunc = (courseId) =>
  {
    const baseURL = 'http://localhost:8080';
    const url = `${baseURL}/courses/courseId/${courseId}`;
    console.log("URL-",url)
    axios.delete(url)
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
        //setDeleteInfo(error.response.data.message)
        // Có thể hiển thị thông báo lỗi cho người dùng
      });
  }


  const handleDeleteSuccess = (e) =>
  {
    setDeleteSuccess(false)
    getWeeklySchedule();
  }


  const [showForm, setShowForm] = useState(false);
 
  const handleShowForm = () => {
    setShowForm(true);
  };
  function CreateTeacherForm() {
    const [newTeacher, setNewTeacher] = useState({
      courseId: '',
      courseName: '',
      classDays: '',
      maxRegistPerRegist: '',
      maxStuPerClass: '',
      isAvailable: true,
    });
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setNewTeacher((prevTeacher) => ({
        ...prevTeacher,
        [name]: value,
      }));
    };
  
    const handleCheckboxChange = (event) => {
      const dayOfWeek = event.target.value;
      setNewTeacher((prevTeacher) => ({
        ...prevTeacher,
        classDays: event.target.checked
          ? [...prevTeacher.classDays, dayOfWeek]
          : prevTeacher.classDays.filter((day) => day !== dayOfWeek),
      }));
    };
  
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const courseData = {
            ...newTeacher,
            classDays: newTeacher.classDays, // Gửi trực tiếp mảng classDays
          };
          console.log(courseData);
          const response = await axios.post('http://localhost:8080/courses/create', courseData);
          const { status, message } = response.data;
          if (status === 'success') {
            setNewTeacher({
              courseId: '',
              courseName: '',
              classDays: '',
              maxRegistPerRegist: '',
              maxStuPerClass: '',
            });
            setShowForm(false);
            SetsuccessCreateCourse(true);
            getWeeklySchedule();


          } else {
            throw new Error(message);
          }
        } catch (error) {
          console.error('Failed to create course:', error);
        }
      };
  
    return (
      <form onSubmit={handleSubmit} style={{ backgroundImage: 'url("/gradient.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', padding: '100px', zIndex: 5 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gridGap: '10px' }}>
          <TextField label="Course ID" name="courseId" value={newTeacher.courseId} onChange={handleChange} required />
          <TextField label="Course Name" name="courseName" value={newTeacher.courseName} onChange={handleChange} required />
          <TextField label="Maximum Regist" name="maxRegistPerRegist" type="number" value={newTeacher.maxRegistPerRegist} onChange={handleChange} required />
          <TextField label="Maximum Student" name="maxStuPerClass" type="number" value={newTeacher.maxStuPerClass} onChange={handleChange} required />
          
        </div>
        <Typography variant='h1' gutterBottom></Typography>
        <div>
            <Typography style={{fontWeight:'bold', fontSize:'1.6rem'}} >Class Days</Typography>
            <div>
              <FormControlLabel
                control={<Checkbox value="MONDAY" checked={newTeacher.classDays.includes('MONDAY')} onChange={handleCheckboxChange} />}
                label="MONDAY"
              />
              <FormControlLabel
                control={<Checkbox value="TUESDAY" checked={newTeacher.classDays.includes('TUESDAY')} onChange={handleCheckboxChange} />}
                label="TUESDAY"
              />
              <FormControlLabel
                control={<Checkbox value="WEDNESDAY" checked={newTeacher.classDays.includes('WEDNESDAY')} onChange={handleCheckboxChange} />}
                label="WEDNESDAY"
              />
              <FormControlLabel
                control={<Checkbox value="THURSDAY" checked={newTeacher.classDays.includes('THURSDAY')} onChange={handleCheckboxChange} />}
                label="THURSDAY"
              />
              <FormControlLabel
                control={<Checkbox value="FRIDAY" checked={newTeacher.classDays.includes('FRIDAY')} onChange={handleCheckboxChange} />}
                label="FRIDAY"
              />
              <FormControlLabel
                control={<Checkbox value="SATURDAY" checked={newTeacher.classDays.includes('SATURDAY')} onChange={handleCheckboxChange} />}
                label="SATURDAY"
              />
              <FormControlLabel
                control={<Checkbox value="SUNDAY" checked={newTeacher.classDays.includes('SUNDAY')} onChange={handleCheckboxChange} />}
                label="SUNDAY"
              />
              {/* Thêm các FormControlLabel cho các ngày khác */}
            </div>
          </div>

        {/* Phần nút submit và cancel */}
        <Typography variant='h1'></Typography>
        <RegistButton  variant='contained' style={{
          width: '150px', // Độ rộng của Box
          height: '50px',
          fontSize: '0.9rem',
          alignItems:'center', // Kích thước của nút
          color: '#FFFFFF/', // Màu chữ của nút
          borderRadius: '10px', // Bo tròn góc của viền
          fontWeight: 'bold',
          top:'10px',
          textTransform: 'none',
          '&: hover': { backgroundColor: '#BCA9F5'}
        }} type="submit"><SendIcon/><Typography paddingLeft={1.5} style={{fontWeight: 'bold'}}>Xác nhận</Typography></RegistButton>
        <CancelButton style={{
          width: '150px', // Độ rộng của Box
          height: '50px',
          fontSize: '0.9rem',
          alignItems:'center', // Kích thước của nút
          color: '#FFFFFF/', // Màu chữ của nút
          borderRadius: '10px', // Bo tròn góc của viền
          fontWeight: 'bold',
          top:'10px',
          textTransform: 'none',
          '&: hover': { backgroundColor: 'blue'}
        }} onClick={handleRefresh}><CancelIcon/><Typography paddingLeft={1.5} style={{fontWeight: 'bold'}}>Huỷ bỏ</Typography></CancelButton>
      </form>
    );
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

        {AdminUserID ? (
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
                <Box style={{
                        fontSize: '1.0rem', // Kích thước của nút
                            color: '#FFFFFF', // Màu chữ của nút
                            border: '0px solid #380B61', // Viền nằm trong nút
                            borderRadius: '3px', // Bo tròn góc của viền
                            padding: '10px 25px',
                            display: 'flex', // Sử dụng flexbox để căn chỉnh
                            alignItems: 'center', 
                            fontWeight: 'bold',
                            textTransform: 'none',

                            
                        }}>
                        <AccountCircleIcon fontSize= 'large'  />
                        <Typography paddingLeft={1} ></Typography>
                        Admin ID: {AdminUserID}
                        </Box>
                    <FunctionButton onClick={handleLogOut}>
                      <LogoutIcon/>
                      <Typography paddingLeft={0.5} ></Typography>
                        Log Out
                    </FunctionButton>
                </Stack>
            </Toolbar>
        </AppBar>

        {showForm && <CreateTeacherForm />}
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
          }}> Quản lí môn học </Typography>
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

            <RegistButton style={{
                width: '250px', // Độ rộng của Box
                height: '50px', 
                fontSize: '1.0rem', // Kích thước của nút // Khoảng cách so với mép màn hình bên phải
                borderRadius: '10px', // Bo tròn góc của viền
                justifyContent: 'center', // Căn chữ theo chiều ngang vào giữa,
                alignItems: 'center', 
                textTransform: 'none',
                position: 'relative', // Thiết lập position để có thể dịch chuyển
                left: '190px', // Dịch sang phải 100px
                top: '-10px',
                }}
              onClick={handleShowForm}><EditNoteIcon/> <Typography variant='h7' paddingLeft={0.8} style={{fontWeight: 'bold'}} >Tạo Môn Học</Typography></RegistButton>

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
                <TableCell align='center' style={{ fontWeight: "bold",borderRight: "1px solid rgba(224, 224, 224, 1)" }}>Thứ</TableCell>
                <TableCell align='center' style={{ fontWeight: "bold",borderRight: "1px solid rgba(224, 224, 224, 1)" }}>Xoá môn học</TableCell>

                {/* Thêm các TableCell khác cho các cột */}
              </TableRow>
            </TableHead>
            <TableBody ref={tableBodyRef}>
              {/* Lặp qua dữ liệu và tạo các TableRow chứa TableCell */}
              {dummyData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell align='center' style={{width: '10px' ,borderRight: "1px solid rgba(224, 224, 224, 1)"}}>{row.MaMH}</TableCell>
                  <TableCell style={{width: '230px',borderRight: "1px solid rgba(224, 224, 224, 1)"}}>{row.TenMonHoc}</TableCell>
                  <TableCell style={{width: '530px',borderRight: "1px solid rgba(224, 224, 224, 1)"}}>{row.classDays}</TableCell>
                  <TableCell align='center' style={{width: '80px' ,borderRight: "1px solid rgba(224, 224, 224, 1)"}}><RegistButton onClick={()=>handleDelete(row.MaMH)}><DeleteIcon/></RegistButton></TableCell>

                  {/* Thêm các TableCell khác cho các cột */}
                </TableRow>
              ))}
              
            </TableBody>
          </Table>
          </TableContainer>


      

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
                  top: '400px',
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
                  <Typography style={{ }} variant='h5'>Bạn đã xoá môn thành công</Typography>
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

        {successCreateCourse&&
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
                  top: '400px',
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
                  <Typography style={{ fontWeight: 'bold' }} variant='h4' gutterBottom>Thông báo!</Typography>
                  <Typography variant='h3' gutterBottom></Typography>
                  <Typography style={{ }} variant='h5'>Tạo môn học thành công.</Typography>
                </Stack>
                <IconButton
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    color: '#fff',
                  }}
                  onClick={() => SetsuccessCreateCourse(false)}
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