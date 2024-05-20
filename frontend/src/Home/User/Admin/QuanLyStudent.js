import { styled} from '@mui/material';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import StarExplosion from './Starbg'
import {useNavigate}  from 'react-router-dom';
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios'; 
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React, { useState, useEffect } from 'react';
import { useRef } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';
import EditNoteIcon from '@mui/icons-material/EditNote';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';

function QuanLyStudent() {
  const [successDeleteUser, setsuccessDeleteUser]=useState(false);
  const [DeleteUser, setDeleteUser]=useState(false);
  const [FailDeleteUser, setFailDeleteUser]=useState(false);

  const SearchLabel = () => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <span></span>
    </div>
  );
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


  const navigate = useNavigate();
  const handleLogOut = (e) =>{
    localStorage.removeItem('AdminUserID');
    localStorage.removeItem('AdminName');
    navigate('/home');
  }
  const handleHomeClick = () => {
    // Hiển thị ô vuông khi bấm nút SignUp
      navigate('/home')
  };
  const handleTrangChu = (e) =>{
    navigate('/home/admin');
  }
  const handleRefresh = (e)=>
  {
    setShowForm(false);
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
  const AdminUserID = localStorage.getItem('AdminUserID');
  const AdminName =localStorage.getItem("AdminName");
  
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  function StudentTable({ students }) {


    const handleViewDetails = (studentId) => {
      // Chuyển hướng đến trang thông tin chi tiết với studentId
      navigate(`/home/admin/Student_Info_1?studentId=${studentId}`);
    };



    const filteredStudents = students.filter((student) => {
      const name = student.name.toLowerCase();
      const id = student.id.toString().toLowerCase();
      const searchTermLowerCase = searchTerm.toLowerCase();
      return name.includes(searchTermLowerCase) || id.includes(searchTermLowerCase);
    });
    

    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
      setInputValue(e.target.value);
    };
    
    const handleInputKeyDown = (e) => {
      if (e.key === 'Enter') {
        setSearchTerm(inputValue);
        setInputValue('');
      }
    };
    
    const handleInputBlur = () => {
      setSearchTerm(inputValue);
      setInputValue('');
    };



    const handleDelete = async (ID) => {
      try {
        const response = await axios.delete(`http://localhost:8080/student/studentId/${ID}`);
        const { status, message } = response.data;
    
        if (status === "success") {
          console.log(message); // Xóa thành công
          setsuccessDeleteUser(true);
          setDeleteUser(true);
          // Cập nhật lại danh sách giáo viên sau khi xóa
          fetchData();
        } else {
          console.error(message); // Thông báo lỗi
        }
      } catch (error) {
        setsuccessDeleteUser(true);
        setFailDeleteUser(true);
        if (error.response && error.response.data) {
          const { status, message } = error.response.data;
          console.error(`${status}: ${message}`); // Xử lý lỗi từ backend
        } else {
          console.error("An error occurred while deleting teacher:", error);
        }
      }
    }

    
    return (
<>

  <Box>
    <RegistButton style={{
                width: '250px', // Độ rộng của Box
                height: '50px', 
                fontSize: '1.0rem', // Kích thước của nút // Khoảng cách so với mép màn hình bên phải
                borderRadius: '10px', // Bo tròn góc của viền
                justifyContent: 'center', // Căn chữ theo chiều ngang vào giữa,
                alignItems: 'center', 
                textTransform: 'none',
                position: 'relative', // Thiết lập position để có thể dịch chuyển
                left: (window.innerWidth-1300)/2-5, // Dịch sang phải 100px
                top: '30px',
                }}
              onClick={handleShowForm}><EditNoteIcon/> <Typography variant='h7' paddingLeft={0.8} style={{fontWeight: 'bold',}} >Tạo sinh viên</Typography></RegistButton>

  </Box>
  <Box 
          display="flex"
          minHeight="0vh"
          
          style={{
              width: '280px', // Độ rộng của Box
              height: '50px', 
              fontSize: '1.0rem', // Kích thước của nút // Khoảng cách so với mép màn hình bên phải
              backgroundImage: 'url("/gradient.jpg")', 
              backgroundSize: 'cover',// Màu nền của nút
              borderRadius: '10px', // Bo tròn góc của viền
              justifyContent: 'center', // Căn chữ theo chiều ngang vào giữa,
              alignItems: 'center', 
              fontWeight: 'bold',
              position: 'relative',
              top: '-20px',
              left: ((window.innerWidth-1500)/2)+1500-390+5 ,

          }}>
            


          <TextField
              label="Search"
              variant="standard"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              onBlur={handleInputBlur}
              
              style={{
                width: '240px',}}
            />
          
  </Box>
      
      
      <Box 
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="0vh">

            <Typography variant='h1' gutterBottom/>
          
        
        <TableContainer component={Paper}
        style={{
          backgroundImage: 'url("/gradient.jpg")', 
          backgroundSize: 'cover',
          borderRadius: '10px',
          width: '1300px', 
          zIndex: 1// Độ rộng của Box

        }}>
          
        <Table>
          <TableHead >
            <TableRow>
              <TableCell align='center' style={{ fontWeight: "bold",borderRight: "1px solid rgba(224, 224, 224, 1)" }}>ID</TableCell>
              <TableCell align='center' style={{ fontWeight: "bold",borderRight: "1px solid rgba(224, 224, 224, 1)" }}>Name</TableCell>
              <TableCell align='center' style={{ fontWeight: "bold",borderRight: "1px solid rgba(224, 224, 224, 1)" }}>Age</TableCell>
              <TableCell align='center' style={{ fontWeight: "bold",borderRight: "1px solid rgba(224, 224, 224, 1)" }}>Gender</TableCell>
              <TableCell align='center' style={{ fontWeight: "bold",borderRight: "1px solid rgba(224, 224, 224, 1)" }}>Date of Birth</TableCell>
              <TableCell align='center' style={{ fontWeight: "bold",borderRight: "1px solid rgba(224, 224, 224, 1)" }}>Place of Birth</TableCell>
              <TableCell align='center' style={{ fontWeight: "bold",borderRight: "1px solid rgba(224, 224, 224, 1)" }}>Citizen Identification</TableCell>
              <TableCell align='center' style={{ fontWeight: "bold",borderRight: "1px solid rgba(224, 224, 224, 1)" }}>Email</TableCell>
              <TableCell align='center' style={{ fontWeight: "bold",borderRight: "1px solid rgba(224, 224, 224, 1)" }}>Phone Number</TableCell>
              <TableCell align='center' style={{ fontWeight: "bold",borderRight: "1px solid rgba(224, 224, 224, 1)" }}>Is Study </TableCell>
              <TableCell align='center' style={{ fontWeight: "bold",borderRight: "1px solid rgba(224, 224, 224, 1)" }}>Details</TableCell>
              <TableCell align='center' style={{ fontWeight: "bold",borderRight: "1px solid rgba(224, 224, 224, 1)" }}>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {filteredStudents.map((student) => (
            <TableRow key={student.id}>
              <TableCell align='center' style={{borderRight: "1px solid rgba(224, 224, 224, 1)" }}>{student.id}</TableCell>
              <TableCell align='center' style={{borderRight: "1px solid rgba(224, 224, 224, 1)" }}>{student.name}</TableCell>
              <TableCell align='center' style={{borderRight: "1px solid rgba(224, 224, 224, 1)" }}>{student.age}</TableCell>
              <TableCell align='center' style={{borderRight: "1px solid rgba(224, 224, 224, 1)" }}>{student.gender=="F"?"Nữ":"Nam"}</TableCell>
              <TableCell align='center' style={{width: '90px', borderRight: "1px solid rgba(224, 224, 224, 1)" }}>{student.dateOfBirth}</TableCell>
              <TableCell align='center' style={{width: '90px', borderRight: "1px solid rgba(224, 224, 224, 1)" }}>{student.placeOfBirth}</TableCell>
              <TableCell align='center' style={{borderRight: "1px solid rgba(224, 224, 224, 1)" }}>{student.citizenIdentification}</TableCell>
              <TableCell style={{borderRight: "1px solid rgba(224, 224, 224, 1)" }}>{student.email}</TableCell>
              <TableCell align='center' style={{borderRight: "1px solid rgba(224, 224, 224, 1)" }}>{student.phoneNumber}</TableCell>
              <TableCell align='center' style={{borderRight: "1px solid rgba(224, 224, 224, 1)" }}>{student.isStudy ? 'Yes' : 'No'}</TableCell>
              <TableCell align='center'  style={{width: '20px' ,fontWeight:'bold',borderRight: "1px solid rgba(224, 224, 224, 1)" }}>
                <RegistButton
                  
                  onClick={() => handleViewDetails(student.id)}>
                <SearchIcon/>
                </RegistButton>
              </TableCell>
              <TableCell align='center'  style={{width: '20px' ,fontWeight:'bold',borderRight: "1px solid rgba(224, 224, 224, 1)" }}>
                <RegistButton
                  
                  onClick={() => handleDelete(student.id)}>
                  <DeleteIcon/>
                </RegistButton>
              </TableCell>
            </TableRow>
            
          ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Box>
</>
    );
  }
  const [showTable, setShowTable] = useState(false);
  const [studentData, setStudentData] = useState([]);

  async function fetchData() {
    try {
      const response = await axios.get('http://localhost:8080/student/getAll');
      const { status, message, data } = response.data;
      if (status === 'ok') {
        setStudentData(data);
        setShowTable(true);
      } else {
        throw new Error(message);
      }
    } catch (error) {
      console.error('Failed to fetch student data:', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  // useEffect(() => {
  //   if (window.performance && window.performance.navigation.type === window.performance.navigation.TYPE_BACK_FORWARD) {
  //     fetchData();
  //   }
  // }, []);

  const [ Notification, setNotification] = useState(false);
  const [ Notification_1, setNotification_1] = useState(false);
  const [ Notification_2, setNotification_2] = useState(false);
  const handleSuccessClose = () => {
    setNotification(false);
    setNotification_1(false);
    setNotification_2(false);
  };
  const [showForm, setShowForm] = useState(false);
  const handleShowForm = () => {
    setShowForm(true);
  };
  function CreateStudentForm({ student, onUpdate }) {
    const [newStudent, setNewStudent] = useState({
      name: '',
      age: '',
      gender: '',
      dateOfBirth: '',
      placeOfBirth: '',
      citizenIdentification: '',
      email: '',
      phoneNumber: '',
      isStudy: true,
    });

    const handleChange = (event) => {
      const { name, value } = event.target;
      setNewStudent((prevStudent) => ({
        ...prevStudent,
        [name]: value,
      }));
    };
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const response = await axios.post('http://localhost:8080/student/create', newStudent);
        const { status, message } = response.data;
        if (status === 'success') {
          // Thông báo thành công và làm mới dữ liệu sinh viên
          // alert('Tạo sinh viên thành công');
          setNotification(true);
          setNotification_1(true);
          setNewStudent({
            name: '',
            age: '',
            gender: '',
            dateOfBirth: '',
            placeOfBirth: '',
            citizenIdentification: '',
            email: '',
            phoneNumber: '',
            isStudy: true,
          });
          setShowForm(false);
          fetchData(); // Lấy lại dữ liệu sinh viên từ backend
        } else {
          throw new Error(message);
        }
      } catch (error) {
        console.error('Failed to create student:', error);
        setNotification(true);
        setNotification_2(true);
      }
    };
    return (
      <form onSubmit={handleSubmit} style={{backgroundImage: 'url("/gradient.jpg")', // Sử dụng đường dẫn từ thư mục public
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center', padding: '100px',
                                            zIndex: 5,}}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gridGap: '10px' }}>
          <TextField
            label="Name"
            name="name"
            value={newStudent.name}
            onChange={handleChange}
            required
          />
          <TextField
            label="Age"
            name="age"
            type="number"
            value={newStudent.age}
            onChange={handleChange}
            inputMode="numeric"
            required
          />
          <TextField
            label="Gender"
            name="gender"
            value={newStudent.gender}
            onChange={handleChange}
            inputMode="text"
            required
          />
          <TextField
            label="Date of Birth:         "
            name="dateOfBirth"
            type="date"
            value={newStudent.dateOfBirth}
            onChange={handleChange}
            required
            InputProps={{
              startAdornment: <SearchLabel />,
              style: {
                color: '#000000',
              },
            }}
          />
          <TextField
            label="Place of Birth"
            name="placeOfBirth"
            value={newStudent.placeOfBirth}
            onChange={handleChange}
            inputMode="text"
            required
            
          />
          <TextField
            label="Citizen Identification"
            name="citizenIdentification"
            value={newStudent.citizenIdentification}
            onChange={handleChange}
            inputMode="text"
            required
          />
          <TextField
            label="Email"
            name="email"
            value={newStudent.email}
            onChange={handleChange}
            inputMode="email"
            required
          />
          <TextField
            label="Phone Number"
            name="phoneNumber"
            value={newStudent.phoneNumber}
            onChange={handleChange}
            inputMode="tel"
            required
          />
        </div>
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
    
        <div 
        style={{ 
          backgroundImage: 'url("/bg1.jpg")', // Sử dụng đường dẫn từ thư mục public
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          zIndex: 5,
          overflow: 'hidden', 
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
        {AdminUserID ? (
<>
            <AppBar position='static'>
                <Toolbar  className='custom-toolbar' sx={{ bgcolor: 'transparent' ,}}>
                <img src="/Hogwarts.png" alt="Icon" width="80" height="50" />
                    <Typography variant='h5' style={{ fontWeight: 'bold' }} align='left' sx={{flexGrow:5} }  > HCM Hogwarts  University </Typography>
                      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ flexGrow: 100 }}> 
                        <Stack direction="row">
                            <FunctionButton onClick={handleTrangChu}>Trang Chủ</FunctionButton>
                        </Stack>
                      </Stack>
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

    {showForm && <CreateStudentForm />}
          {showTable && (
      <div>
        <Typography variant='h1' gutterBottom/>

        <Typography gutterBottom style={{fontSize: '3.0rem', textAlign: 'center', fontWeight: 'bold', color: '#FFFFFF'}}> Thông tin sinh viên</Typography>


        <StudentTable students={studentData} />
      </div>
    )}
                {Notification && (
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
                    top: window.innerHeight/2,
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
                    
                    {Notification_1 && (
                      <>
                      <Typography style={{ fontWeight: 'bold' }} variant='h4' gutterBottom>
                      Thông Báo !
                    </Typography>
                        <Typography variant='h3' gutterBottom></Typography>
                        <Typography style={{}} variant='h5'>
                        Tạo sinh viên thành công
                        </Typography>
                      </>
                    )}
                    {Notification_2 && (
                      <>
                      <Typography style={{ fontWeight: 'bold' }} variant='h4' gutterBottom>
                      Cảnh Báo !
                    </Typography>
                        <Typography variant='h3' gutterBottom></Typography>
                        <Typography style={{}} variant='h5'>
                          Tạo sinh viên thất bại. Hãy đảm bảo không để trùng thông tin
                        </Typography>
                      </>
                    )}
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
            )}
            {successDeleteUser && (
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
                    top: window.innerHeight/2,
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
                 
                    {DeleteUser && (
                      <>
                      <Typography style={{ fontWeight: 'bold' }} variant='h4' gutterBottom>
                      Thông Báo !
                    </Typography>
                        <Typography variant='h3' gutterBottom></Typography>
                        <Typography style={{}} variant='h5'>
                        Xoá sinh viên thành công.
                        </Typography>
                      </>
                    )}
                    {FailDeleteUser && (
                      <>
                      <Typography style={{ fontWeight: 'bold' }} variant='h4' gutterBottom>
                      Cảnh Báo !
                    </Typography>
                        <Typography variant='h3' gutterBottom></Typography>
                        <Typography style={{}} variant='h5'>
                          Xoá sinh viên thất bại.
                        </Typography>
                      </>
                    )}
                  </Stack>
                  <IconButton
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      color: '#fff',
                    }}
                    onClick={() => setsuccessDeleteUser(false)}
                  >
                    <CloseIcon />
                  </IconButton>
                </div>
              </>
            )}
</>
      ) : (
        // Render cảnh báo khi không có StudentUserID

        <Box align='center' direction='row' > 
        
          <Typography variant='h2' color='#FFFFFF' style={{ fontWeight: 'bold' }}>Error: Unauthenticated </Typography>
          <FunctionButton onClick={handleHomeClick}>Về trang Đăng Nhập</FunctionButton>

       </Box>
      )}

        </div>
    
  );
}

export default QuanLyStudent