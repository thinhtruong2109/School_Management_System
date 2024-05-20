import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SendIcon from '@mui/icons-material/Send'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import React, { useState, useEffect } from 'react';
import LoginIcon from '@mui/icons-material/Login';
import TextField from '@mui/material/TextField';
import {useNavigate}  from 'react-router-dom';
import { styled} from '@mui/material';
import axios from 'axios'; 
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


function Home() {

    const [showPassword, setShowPassword] = useState(false);

    const [showUserTextBox, setShowUserTextBox] = useState(false);

    const [showStudentsLoginTextBox, setShowStudentsLoginTextBox] = useState(false);
    const [showTeachersLoginTextBox, setShowTeachersLoginTextBox] = useState(false);
    const [showAdminLoginTextBox, setShowAdminLoginTextBox] = useState(false);

    const [Admin_name,setAdminName]=useState('')
    const [Admin_password, setAdminPassword] = useState('')

    const [Teachers_name,setTeachersName]=useState('')
    const [Teachers_password, setTeachersPassword] = useState('')
    
    const [Students_name,setStudentsName]=useState('')
    const [Students_password, setStudentsPassword] = useState('')

    const navigate = useNavigate();

    const UserButton = styled (Button)
    ({
      fontSize: '1.0rem', // Kích thước của nút
        color: '#380B61', // Màu chữ của nút
        border: '0px solid #380B61', // Viền nằm trong nút
        borderRadius: '9px', // Bo tròn góc của viền
        padding: '30px 200px',
        display: 'flex', // Sử dụng flexbox để căn chỉnh
        alignItems: 'center', 
        fontWeight: 'bold',
        '&: hover': { backgroundColor: '#BCA9F5'}
        
  })

    const handleLogInClick = () => {
      // Hiển thị ô vuông khi bấm nút SignUp
        setShowUserTextBox(true);
        setShowAdminLoginTextBox(false);
        setShowTeachersLoginTextBox(false);
        setShowStudentsLoginTextBox(false);
    };

    const handleAdminLoginClick = () => {
        // Hiển thị ô vuông khi bấm nút SignUp
        setShowAdminLoginTextBox(true);
        setShowTeachersLoginTextBox(false);
        setShowStudentsLoginTextBox(false);
        setShowUserTextBox(false);
    };
    const handleTeachersLoginClick = () => {
        // Hiển thị ô vuông khi bấm nút SignUp
        setShowTeachersLoginTextBox(true);
        setShowAdminLoginTextBox(false);
        setShowStudentsLoginTextBox(false);
        setShowUserTextBox(false);
    };
    const handleStudentsLoginClick = () => {
        // Hiển thị ô vuông khi bấm nút SignUp
        setShowStudentsLoginTextBox(true);
        setShowAdminLoginTextBox(false);
        setShowTeachersLoginTextBox(false);
        setShowUserTextBox(false);
    };




    
    async function authenticate(username, password,role) {
    
      try {
        const response = await axios.post('http://localhost:8080/user/authenticate', null, {
          params: {
            username,
            password,
            role,
          }
        });
        const { status, message, data } = response.data;
        if (status === 'success') {
          return { success: true, message, data };
        } else {
          throw new Error(message);
        }
      } catch (error) {
        console.log("fail")
        if (error.response) {
          // Lỗi từ phía máy chủ
          const { status, data } = error.response;
          if (status === 404) {
            // Xử lý lỗi 404 (Not Found)
            console.error('User not found:', data.message);
          } else if (status === 401) {
            // Xử lý lỗi 401 (Unauthorized)
            console.error('Authentication failed:', data.message);
          } else {
            // Xử lý lỗi khác
            console.error('Error:', data.message);
          }
        } else if (error.request) {
          // Lỗi khi gửi yêu cầu
          console.error('Request error:', error.message);
        } else {
          // Lỗi khác
          console.error('Error:', error.message);
        }
    
        return { success: false, message: error.message };
      }
    }



    const handleAdminDangNhap = async() => {
      if (Admin_name && Admin_password )
        {
            console.log('Student Loged In',Admin_name,Admin_password);
            //LoginSuccessPage(Admin_password)
            authenticate(Admin_name,Admin_password,"ADMIN")
            .then(result => {
              if (result.success) {
                
                  console.log('Authentication successful:', result.data.id);
                  AdminLoginSuccessPage(result.data.id,result.data.username)//sẽ truyền thêm các dữ liệu khác khi đây ko còn là user mà là đối tượng
                  navigate('/home/admin');
                
              } else {
                console.error('Authentication failed:', result.message);
                alert('Error: Đăng Nhập Thất Bại!');
              }
            })
            .catch(error => {
              console.error('An unexpected error occurred:', error);
            });
        }
        else
        {
            alert("Bạn chưa điền đầy đủ dữ liệu!")
            console.log("Thiếu dữ liệu")
        }


    }

    const handleStudentsDangNhap = (e) => {
      if (Students_name && Students_password )
        {
            console.log('Student Loged In',Students_name,Students_password);
            authenticate(Students_name,Students_password,"STUDENT")
            .then(result => {
              if (result.success) {

                  console.log('Authentication successful:', result.data.id);
                  StudentLoginSuccessPage(result.data.id,result.data.name)//sẽ truyền thêm các dữ liệu khác khi đây ko còn là user mà là đối tượng
                  navigate('/home/students');
                
              } else {
                console.error('Authentication failed:', result.message);
                alert('Error: Đăng Nhập Thất Bại!');
              }
            })
            .catch(error => {
              console.error('An unexpected error occurred:', error);
            });
        }
        else
        {
            alert("Bạn chưa điền đầy đủ dữ liệu!")
            console.log("Thiếu dữ liệu")
        }
      
    }

    const handleTeachersDangNhap = (e) => {
      if (Teachers_name && Teachers_password )
        {
            console.log('Teacher Loged In',Teachers_name,Teachers_password);
            authenticate(Teachers_name,Teachers_password,"TEACHER")
            .then(result => {
              if (result.success) {
                
                  console.log('Authentication successful:', result.data.id);
                  TeacherLoginSuccessPage(result.data.id,result.data.username)//sẽ truyền thêm các dữ liệu khác khi đây ko còn là user mà là đối tượng
                  navigate('/home/teachers');
                
              } else {
                console.error('Authentication failed:', result.message);
                alert('Error: Đăng Nhập Thất Bại!');
              }
            })
            .catch(error => {
              console.error('An unexpected error occurred:', error);
            });
        }
        else
        {
            alert("Bạn chưa điền đầy đủ dữ liệu!")
            console.log("Thiếu dữ liệu")
        }
    }


    // Trong trang đăng nhập
    function AdminLoginSuccessPage( AdminUserID, AdminName ) {
      // Lưu userId vào localStorage
      console.log(AdminUserID,AdminName)
      localStorage.setItem('AdminUserID', AdminUserID);
      localStorage.setItem('AdminName', AdminName);

      // Chuyển hướng đến trang làm việc
    }
    function StudentLoginSuccessPage( StudentUserID, StudentName ) {
      // Lưu userId vào localStorage
      console.log(StudentUserID)
      localStorage.setItem('StudentUserID', StudentUserID);
      localStorage.setItem('StudentName', StudentName);

      // Chuyển hướng đến trang làm việc
    }
    function TeacherLoginSuccessPage( TeacherUserID, TeacherName ) {
      // Lưu userId vào localStorage
      console.log(TeacherUserID)
      localStorage.setItem('TeacherUserID', TeacherUserID);
      localStorage.setItem('TeacherName', TeacherName);

      // Chuyển hướng đến trang làm việc
    }

  
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                // Tắt ô vuông khi nhấn phím Esc
                setShowUserTextBox(false);
                setShowAdminLoginTextBox(false);
                setShowTeachersLoginTextBox(false);
                setShowStudentsLoginTextBox(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        // Cleanup function để loại bỏ sự kiện khi component unmount
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);


  


  return (
    <div className="App" style={{ 
        backgroundImage: 'url("/img2.jpg")', // Sử dụng đường dẫn từ thư mục public
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height: '100vh',
      }}>   

    <AppBar position='static'>
        <Toolbar  sx={{ bgcolor: '#190632' }}>
        <img src="/Hogwarts.png" alt="Icon" width="80" height="50" />
            <Typography variant='h5' style={{ fontWeight: 'bold' }} align='left' sx={{flexGrow:11} } > HCM Hogwarts  University </Typography>
            <Button variant='outlined' color={'inherit'} style={{ 
              fontSize: '1.0rem', // Kích thước của nút
              marginRight: '10px', // Khoảng cách so với mép màn hình bên phải
              color: '#380B61', // Màu chữ của nút
              backgroundImage: 'url("/gradient2.jpg")', 
              backgroundSize: 'cover', // Màu nền của nút
              border: '0px solid #FFFFFF', // Viền nằm trong nút
              borderRadius: '9px', // Bo tròn góc của viền
              padding: '7px 25px',
              display: 'flex', // Sử dụng flexbox để căn chỉnh
              alignItems: 'center', 
              fontWeight: 'bold',
            }} onClick={handleLogInClick} > <LoginIcon fontSize= 'small' style={{textTransform: 'none', marginRight: '8px',fontWeight: 'bold', }} /> Log In </Button>
        </Toolbar>
    </AppBar>


    {showUserTextBox && (
<>
            <div
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(255, 255, 255, 0.2)', // Màu nền overlay (có thể điều chỉnh)
                  zIndex: 0,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backdropFilter: 'blur(8px)', // Sử dụng backdrop-filter để làm mờ nền
                }}
              />
        <div style={{ 
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
          
        }}>
          <Stack>
                <Typography style={{fontWeight: 'bold'}} variant='h5'>Login</Typography>
                <Typography variant='h2' gutterBottom></Typography>
                <Typography variant='h2' gutterBottom></Typography>


                <UserButton onClick={handleTeachersLoginClick} gutterBottom  > Teacher </UserButton>
                <UserButton onClick={handleStudentsLoginClick} gutterBottom > Student </UserButton>
                <UserButton onClick={handleAdminLoginClick} gutterBottom > Admin </UserButton>
            </Stack>      
        </div>
        </>
    )
   
    }


    {showAdminLoginTextBox && (
      <>
      <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.2)', // Màu nền overlay (có thể điều chỉnh)

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backdropFilter: 'blur(8px)', // Sử dụng backdrop-filter để làm mờ nền
      }}
    />
        <div style={{ 
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundImage: 'url("/gradient4.jpg")', 
            backgroundSize: 'cover',
            padding: '100px 100px',
            borderRadius: '10px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
          }}>
              <Typography variant='h5' style={{fontWeight:'bold'}}>Admin User</Typography>
              <Typography gutterBottom variant='h5'></Typography>
              <TextField label='Username:' variant='standard' fullWidth required onChange={(e)=>setAdminName(e.target.value)}/>
              <TextField
                  label="Password:"
                  variant="standard"
                  fullWidth
                  required
                  type={showPassword ? 'text' : 'password'}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              <Typography gutterBottom variant='h2'></Typography>
              <Button startIcon={<SendIcon/> } variant='contained' color={'inherit'} onClick={handleAdminDangNhap} style={{ 
                fontSize: '1.0rem', // Kích thước của nút
                marginRight: '10px', // Khoảng cách so với mép màn hình bên phải
                color: '#380B61', // Màu chữ của nút
                backgroundColor: '#FFFFFF', // Màu nền của nút
                border: '0px solid #FFFFFF', // Viền nằm trong nút
                borderRadius: '9px', // Bo tròn góc của viền
                padding: '7px 25px',
                display: 'flex', // Sử dụng flexbox để căn chỉnh
                alignItems: 'center', 
                fontWeight: 'bold',
              }}>Đăng Nhập</Button>
        </div>
      </>

    )}

    {showTeachersLoginTextBox &&(
      <>
          <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.2)', // Màu nền overlay (có thể điều chỉnh)
    
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backdropFilter: 'blur(8px)', // Sử dụng backdrop-filter để làm mờ nền
          }}
        />
        <div style={{ 
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundImage: 'url("/gradient4.jpg")', 
            backgroundSize: 'cover',
            padding: '100px 100px',
            borderRadius: '10px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
          }}>
            <Typography variant='h5' style={{fontWeight:'bold'}}>Teacher User</Typography>
            <Typography gutterBottom variant='h5'></Typography>
            <TextField label='Username:' variant='standard' fullWidth required onChange={(e)=>setTeachersName(e.target.value)}/>
            <TextField
                  label="Password:"
                  variant="standard"
                  fullWidth
                  required
                  type={showPassword ? 'text' : 'password'}
                  onChange={(e) => setTeachersPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
            <Typography gutterBottom variant='h2'></Typography>
            <Button startIcon={<SendIcon/> } variant='contained' color={'inherit'} onClick={handleTeachersDangNhap} style={{ 
              fontSize: '1.0rem', // Kích thước của nút
              marginRight: '10px', // Khoảng cách so với mép màn hình bên phải
              color: '#380B61', // Màu chữ của nút
              backgroundColor: '#FFFFFF', // Màu nền của nút
              border: '0px solid #FFFFFF', // Viền nằm trong nút
              borderRadius: '9px', // Bo tròn góc của viền
              padding: '7px 25px',
              display: 'flex', // Sử dụng flexbox để căn chỉnh
              alignItems: 'center', 
              fontWeight: 'bold',
            }}>Đăng Nhập</Button>
        </div>
</>
    )}

    {showStudentsLoginTextBox && (
      <>
      <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.2)', // Màu nền overlay (có thể điều chỉnh)
   
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backdropFilter: 'blur(8px)', // Sử dụng backdrop-filter để làm mờ nền
      }}
    />
        <div style={{ 
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundImage: 'url("/gradient4.jpg")', 
            backgroundSize: 'cover',
            padding: '100px 100px',
            borderRadius: '10px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
            }}>
            <Typography variant='h5' style={{fontWeight:'bold'}}>Student User</Typography>
            <Typography gutterBottom variant='h5'></Typography>
                <TextField  label='Username:' variant='standard' fullWidth required onChange={(e)=>setStudentsName(e.target.value)}/>
                <TextField
                  label="Password:"
                  variant="standard"
                  fullWidth
                  required
                  type={showPassword ? 'text' : 'password'}
                  onChange={(e) => setStudentsPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Typography gutterBottom variant='h2'></Typography>
                <Button startIcon={<SendIcon/> } variant='contained' color={'inherit'} onClick={handleStudentsDangNhap} style={{ 
                  fontSize: '1.0rem', // Kích thước của nút
                  marginRight: '10px', // Khoảng cách so với mép màn hình bên phải
                  color: '#380B61', // Màu chữ của nút
                  backgroundColor: '#FFFFFF', // Màu nền của nút
                  border: '0px solid #FFFFFF', // Viền nằm trong nút
                  borderRadius: '9px', // Bo tròn góc của viền
                  padding: '7px 25px',
                  display: 'flex', // Sử dụng flexbox để căn chỉnh
                  alignItems: 'center', 
                  fontWeight: 'bold',
                }}>Đăng Nhập</Button>
        </div>
        </>
    )}

    <Box mt={20}> 

      <Typography variant='h1' color='#FFFFFF' gutterBottom style={{ fontWeight: 'bold' }} >TRANG CHỦ</Typography>
      <Typography variant='h2' color='#FFFFFF' style={{ fontWeight: 'bold' }}>HO CHI MINH HOGWARTS UNIVERSITY </Typography>

    </Box>


    </div>
  );
}

export default Home;
 