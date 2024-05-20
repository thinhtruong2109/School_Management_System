import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import React, { useState, useEffect } from 'react';
import {useNavigate}  from 'react-router-dom';
import { styled} from '@mui/material';
import axios from 'axios'; 
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import LogoutIcon from '@mui/icons-material/Logout';
import StarExplosion from './Starbg'

function Teachers()
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

    const [events] = useState([]);

    // Hàm xử lý khi có sự kiện mới được thêm vào lịch
    const handleSelectEvent = (event) => {
      console.log('Sự kiện mới:', event);
    };

  


    const handleLichDayHoc = (e) => {
        navigate('/home/teachers/LichDayHoc')

    }
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
    // const[TeacherUserID, setTeacherUserID] = useState('');
    const[TeacherName, setTeacherName] = useState('');
    // const TeacherName =localStorage.getItem("TeacherUserName");
    useEffect(() => {
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
    
        if (TeacherUserID) 
        {
          fetchTeacher();
        }
      }, [TeacherUserID]);
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
                        {/* <FunctionButton onClick={handleHocTap}>Thông Tin Lớp Học</FunctionButton> */}
                        <FunctionButton onClick={handleLichDayHoc}>Lịch Dạy Học</FunctionButton>
                        {/* <FunctionButton onClick={handleCacLopHoc}>Các Lớp Học</FunctionButton> */}
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
export default Teachers