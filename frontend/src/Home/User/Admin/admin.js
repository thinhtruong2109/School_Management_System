
import { styled} from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import SendIcon from '@mui/icons-material/Send';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Rating from '@mui/material/Rating';
import StarExplosion from './Starbg'
import {useNavigate}  from 'react-router-dom';
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Create() {

    // const handleHomeClick = () => {
    //     // Hiển thị ô vuông khi bấm nút SignUp
    //     navigate('/home')
    // };
    const handleLogOut = (e) =>{
        localStorage.removeItem('AdminUserID');
        localStorage.removeItem('AdminName');
        navigate('/home');
    }
    const handleQuanLyTeacher = (e) =>{
        navigate('/home/admin/QuanLyTeacher');
    }
    const handleQuanLyStudent = (e) =>{
        navigate('/home/admin/QuanLyStudent');
        
    }
    const handleTaoMonHoc = (e) =>{
        navigate('/home/admin/TaoMonHoc');
    }

    const handleCourse = (e) =>{
        navigate('/home/admin/CoursesController');
    }
    const handleHomeClick = (e) =>{
        navigate('/home');
    }
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
    const FunctionButton_2 = styled(Button)({
        fontSize: '1.0rem',
        color: '#FFFFFF',
        border: '0px solid #380B61',
        borderRadius: '3px',
        padding: '90px 200px',
        display: 'flex',
        alignItems: 'center',
        fontWeight: 'bold',
        textTransform: 'none',
        whiteSpace: 'nowrap', // Ngăn việc ngắt từ tự động
        wordBreak: 'break-word', // Cho phép các từ trên cùng một hàng
        '&:hover': { background: 'linear-gradient( to top, #F8C3E6, #9D55A2)'},
      })
  const AdminUserID = localStorage.getItem('AdminUserID');
  const AdminName =localStorage.getItem("AdminName");

  return (
    
        <div 
        style={{ 
          backgroundImage: 'url("/bg1.jpg")', // Sử dụng đường dẫn từ thư mục public
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
      zIndex: 4,
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

        {AdminUserID?(
            <>
            <AppBar position='static'>
                <Toolbar  className='custom-toolbar' sx={{ bgcolor: 'transparent' ,}}>

                <img src="/Hogwarts.png" alt="Icon" width="80" height="50" />
                    <Typography variant='h5' style={{ fontWeight: 'bold' }} align='left' sx={{flexGrow:11} }  > HCM Hogwarts  University </Typography>

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
            </AppBar>,


            <div>
                <Typography variant='h1' gutterBottom/>

                <Typography gutterBottom style={{fontSize: '3.0rem', textAlign: 'center', fontWeight: 'bold', color: '#FFFFFF'}}>Control Center</Typography>

                <Typography variant='h1' gutterBottom/>


            
            </div>


            <Grid container spacing={15} alignItems="center" justifyContent="center"  >
            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Box style={{zIndex:4}} sx={{ width: '400px', height: '200px', background: 'linear-gradient(to top left, #F8C3E6, #9D55A2)',  borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center',}}>
                    <FunctionButton_2 onClick={handleTaoMonHoc}>
                        <Typography paddingLeft={0.5} ></Typography>
                            QUẢN LÝ HỌC KÌ 
                        </FunctionButton_2>
                </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Box style={{zIndex:4}}   sx={{ width: '400px', height: '200px', background: 'linear-gradient(to bottom right, #F8C3E6, #9D55A2)', borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center',}}>
                        <FunctionButton_2  onClick={handleCourse}>
                        <Typography paddingLeft={0.5} ></Typography>
                            QUẢN LÝ MÔN HỌC
                        </FunctionButton_2 >
                </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Box style={{zIndex:4}}  sx={{ width: '400px', height: '200px', background: 'linear-gradient(to bottom left, #F8C3E6, #9D55A2)', borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center',}}>
                        <FunctionButton_2 onClick={handleQuanLyStudent}>
                        <Typography paddingLeft={0.5} ></Typography>
                            QUẢN LÝ HỌC SINH
                        </FunctionButton_2>
                </Box>
            </Grid>

            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Box style={{zIndex:4}}  sx={{ width: '400px', height: '200px', background: 'linear-gradient(to bottom, #F8C3E6, #9D55A2)', borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center',}}>
                        <FunctionButton_2 onClick={handleQuanLyTeacher}>
                        <Typography paddingLeft={0.5} ></Typography>
                            QUẢN LÝ GIÁO VIÊN
                        </FunctionButton_2>
                </Box>
            </Grid>
            </Grid>
            </>
        ):(<Box align='center' direction='row' > 
        
        <Typography variant='h2' color='#FFFFFF' style={{ fontWeight: 'bold'  }}>Error: Unauthenticated </Typography>
        <FunctionButton onClick={handleHomeClick}>Về trang Đăng Nhập</FunctionButton>

     </Box>)
        }   

        </div>
    
    )
}

export default Create;