import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import React, { useState, useEffect } from 'react';
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
import StudentInfo from './StudentInfo';
import LogoutIcon from '@mui/icons-material/Logout';
import Card from '@mui/material/Card';
import  CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import StarExplosion from './Starbg'

function Students()
{
  const handleHomeClick = () => {
    // Hiển thị ô vuông khi bấm nút SignUp
      navigate('/home')
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


    const locales = {
        'vi-VN': require('date-fns/locale/vi'),
    };
    
    const localizer = dateFnsLocalizer({
        format,
        parse,
        startOfWeek,
        getDay,
        locales,
    });

    const [events, setEvents] = useState([]);

    // Hàm xử lý khi có sự kiện mới được thêm vào lịch
    const handleSelectEvent = (event) => {
      console.log('Sự kiện mới:', event);
    };

    const eventData = [
        {
          title: 'Sự kiện 1',
          start: new Date(2023, 4, 15, 9, 0),
          end: new Date(2023, 4, 15, 10, 0),
        },
        {
          title: 'Sự kiện 2',
          start: new Date(2023, 4, 16, 14, 0),
          end: new Date(2023, 4, 16, 16, 0),
        },
        // Thêm các sự kiện khác vào đây
      ];
  
    const handleAddEvent = (event) => {
        setEvents([...events, event]);
      };

    const handleHocTap = (e) => {
        navigate('/home/students/HocTap')
    }
    const handleThoiKhoaBieu = (e) => {
        navigate('/home/students/ThoiKhoaBieu')

    }
    const handleDangKiMonHoc = (e) => {
        navigate('/home/students/DangKiMonHoc')
    }
    const handleStudentInfo = (e) => {
        navigate('/home/students/StudentInFo')
    }
    const handleLogOut = (e) =>
    {
      localStorage.removeItem('StudentUserID');
      localStorage.removeItem('StudentName');
      navigate('/home')
    }

    // Trong trang làm việc
    const StudentUserID = localStorage.getItem('StudentUserID');
    const StudentName =localStorage.getItem("StudentName");

    const [studentID,setstudentID]=useState('')



    const articles = [
      {
        title: 'Bài báo 1',
        content: 'Nội dung của bài báo 1',
        imageUrl: '/path/to/image1.jpg',
      },
      {
        title: 'Bài báo 2',
        content: 'Nội dung của bài báo 2',
        imageUrl: '/path/to/image2.jpg',
      },
      {
        title: 'Bài báo 3',
        content: 'Nội dung của bài báo 3',
        imageUrl: '/path/to/image2.jpg',
      },
      // Thêm các bài báo khác vào đây
    ];





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


        {StudentUserID ? (
        <>
        <AppBar position='static'>
            <Toolbar  className='custom-toolbar' sx={{ bgcolor: 'transparent' ,}}>
            <img src="/Hogwarts.png" alt="Icon" width="80" height="50" />
                <Typography variant='h5' style={{ fontWeight: 'bold' }} align='left' sx={{flexGrow:11} }  > HCM Hogwarts  University </Typography>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ flexGrow: 100 }}>
                    <Stack direction="row">
                        <FunctionButton onClick={handleHocTap}>Học Tập</FunctionButton>
                        <FunctionButton onClick={handleThoiKhoaBieu}>Thời Khoá Biểu</FunctionButton>
                        <FunctionButton onClick={handleDangKiMonHoc}>Đăng Kí Môn Học</FunctionButton>
                    </Stack>
                </Stack>

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
         

    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600, width: 1200,zIndex: 1 }}
          onSelectEvent={handleSelectEvent}
          views={['month', 'week', 'day']}
          locale="vi-VN" // Ngôn ngữ Tiếng Việt
          
          
        />

      </Box> 

{/* 
       <Box sx={{ mt: 4 }}>
        <Typography variant='h3' style={
          {
            fontWeight: 'bold',
            color: '#FFFFFF'
          }
        }>
          About Us
        </Typography>
        <Grid container spacing={5}>
          {articles.map((article, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={article.imageUrl}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {article.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {article.content}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box> 
 */}



</>

      ) : (
        // Render cảnh báo khi không có StudentUserID

        <Box align='center' direction='row' > 
        
          <Typography variant='h2'  color='#FFFFFF' style={{ fontWeight: 'bold' }}>Error: Unauthenticated </Typography>
          <FunctionButton onClick={handleHomeClick}>Về trang Đăng Nhập</FunctionButton>

       </Box>
      )}
    </div>
    
                 
        )
}
export default Students 