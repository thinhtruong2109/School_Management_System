import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SendIcon from '@mui/icons-material/Send'
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
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Grid from '@mui/material/Grid';
import LogoutIcon from '@mui/icons-material/Logout';
import StarExplosion from './Starbg'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SettingsIcon from '@mui/icons-material/Settings';
import SaveIcon from '@mui/icons-material/Save';

function StudentInFo() {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    // Hiển thị ô vuông khi bấm nút SignUp
      navigate('/home')
  };

  const handleStudentHome = () =>
  {
    navigate('/home/teachers')
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




  const handleLogOut = (e) =>
  {
  localStorage.removeItem('TeacherUserID');
  localStorage.removeItem('TeacherName');
  navigate('/home')
  }

  const TeacherUserID = localStorage.getItem('TeacherUserID');



  const [teacherName, setTeacherName] = useState('');
  const [teacherID, setTeacherID] = useState('');
  const [teacherAge, setTeacherAge] = useState('');
  const [teacherGender, setTeacherGender] = useState('');
  const [teacherDateOfBirth, setTeacherDateOfBirth] = useState('');
  const [teacherPlaceOfBirth, setTeacherPlaceOfBirth] = useState('');
  const [teacherCitizenIdentification, setTeacherCitizenIdentification] = useState('');
  const [teacherEmail, setTeacherEmail] = useState('');
  const [teacherPhoneNumber, setTeacherPhoneNumber] = useState('');
  const [teacherMainCourseId, setTeacherMainCourseId] = useState('');
  const [teacherCourseName, setTeacherCourseName] = useState('');
  const [teacherIsAvailable, setTeacherIsAvailable] = useState(false); // Giả sử ban đầu là false


  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        console.log(TeacherUserID)
        const response = await axios.get(`http://localhost:8080/teacher/${TeacherUserID}`);
        const { data } = response.data;
        setTeacherName(data.name);
        setTeacherID(data.id);
        setTeacherAge(data.age);
        setTeacherGender(data.gender);
        setTeacherDateOfBirth(data.dateOfBirth);
        setTeacherPlaceOfBirth(data.placeOfBirth);
        setTeacherCitizenIdentification(data.citizenIdentification);
        setTeacherEmail(data.email);
        setTeacherPhoneNumber(data.phoneNumber);
        setTeacherCourseName(data.courseName);
        setTeacherMainCourseId(data.mainCourseId);
        setTeacherIsAvailable(data.isAvailable);
        
      } catch (error) {
        console.error('Error fetching student data:',);
      }
    };

    if (TeacherUserID) 
    {
      fetchTeacher();
    }
  }, [TeacherUserID]);



//   const [studentGPA, setstudentGPA] = useState('');

//   useEffect(() => {
//     const fetchStudentGPA = async () => {
//       try {
//         console.log(StudentUserID)
//         const response = await axios.get(`http://localhost:8080/student/${StudentUserID}/credits-gpa`);
//         const { data } = response.data;
//         console.log(data)
//         setstudentGPA(data.gpaOnScaleFour);
        
//       } catch (error) {
//         console.error('Error fetching student data:',);
//       }
//     };

//     if (StudentUserID) 
//     {
//       fetchStudentGPA();
//     }
//   }, [StudentUserID]);





  // Kiểm tra nếu student chưa được tải

  

  

  return (
    
    <div style={{ 
      backgroundImage: 'url("/bg1.jpg")', // Sử dụng đường dẫn từ thư mục public
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      zIndex: 4,
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
        {TeacherUserID ? (
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
                <Stack direction={'row'}>
                    <FunctionButton onClick={handleLogOut}>
                      <LogoutIcon/>
                      <Typography paddingLeft={0.5} ></Typography>
                        Log Out
                    </FunctionButton>
                </Stack>
            </Toolbar>

        </AppBar>
      <Typography variant='h2' gutterBottom></Typography>


      <Grid container p={13} spacing={10}>
      {/* p la kcach giua grid va mep cua giao dien spacing la kach giua 2 grid voi nhau */}

        <Grid item xs={6}>
          <Box style = {{
            width: '55vw', // Chiếm 70% chiều rộng của viewport
            height: '70vh', // Chiếm 50% chiều cao của viewport
            fontSize: '1.0rem',
            color: '#380B61',
            backgroundImage: 'url("/gradient8.jpg")',
            backgroundSize: 'cover',
            borderRadius: '10px',
            justifyContent: 'center',
            alignItems: 'center',
            fontWeight: 'bold',
            position: 'relative',
            top: '-4vh', // Thiết lập position để có thể dịch chuyển
          }}>
          {teacherGender === "F" ? (
          <img
            style={{
              borderRadius: '40px',
              position: 'relative',
              top: '20px',
              left: '20px',
            }}
            src="/ICON_NU.png"
            alt="Icon"
            width="250"
            height="250"
          />
        ) : (
          <img
            style={{
              borderRadius: '40px',
              position: 'relative',
              top: '20px',
              left: '20px',
            }}
            src="/ICON_NAM.png"
            alt="Icon"
            width="250"
            height="250"
          />
        )}



          {/* {*<TextField disabled></TextField>*} */}


              <textBox style={{position:'relative',width: '100vw',height: '100vh',left:'290px',top:'-220px',}}><Typography style={{fontWeight: "bold",fontSize: '2.0rem',}}>Hồ Chí Minh Hogwarts University</Typography></textBox>
              <textBox style={{position:'relative',width: '100vw',height: '100vh',left:'290px',top:'-220px',}}><Typography style={{color:'#6D41A8',fontWeight: "bold",position: 'relative', left:'40px',top:'10px',fontWeight: "bold",fontSize: '2.4rem',}} variant="h3">THÔNG TIN SINH VIÊN</Typography></textBox>
              <textBox style={{position:'relative',width: '100vw',height: '100vh',left:'290px',top:'-200px',}}><Typography style={{fontWeight: "bold",fontWeight: "bold",fontSize: '1.7rem'}}>- Tên: {teacherName} </Typography></textBox>
              <textBox style={{position:'relative',width: '100vw',height: '100vh',left:'290px',top:'-195px',}}><Typography style={{fontWeight: "bold",fontWeight: "bold",fontSize: '1.7rem',}} >- Tuổi: {teacherAge}</Typography></textBox>
              <textBox style={{position:'relative',width: '100vw',height: '100vh',left:'290px',top:'-190px',}}><Typography style={{fontWeight: "bold",fontWeight: "bold",fontSize: '1.7rem',}} >- CCCD: {teacherCitizenIdentification}</Typography></textBox>
              <textBox style={{position:'relative',width: '100vw',height: '100vh',left:'290px',top:'-185px',}}>{teacherGender==="F"?(<Typography style={{fontWeight: "bold",fontWeight: "bold",fontSize: '1.7rem',}} >- Giới tính: Nữ</Typography>):(<Typography style={{fontWeight: "bold",fontWeight: "bold",fontSize: '1.7rem',}} >- Giới tính: Nam</Typography>)}</textBox>
              <textBox style={{position:'relative',width: '100vw',height: '100vh',left:'290px',top:'-180px',}}><Typography style={{fontWeight: "bold",fontWeight: "bold",fontSize: '1.7rem',}} >- Ngày sinh: {teacherDateOfBirth}</Typography></textBox>
              <textBox style={{position:'relative',width: '100vw',height: '100vh',left:'290px',top:'-175px',}}><Typography style={{fontWeight: "bold",fontWeight: "bold",fontSize: '1.7rem',}} >- Nơi sinh: {teacherPlaceOfBirth}</Typography></textBox>
              <textBox style={{position:'relative',width: '100vw',height: '100vh',left:'290px',top:'-170px',}}><Typography style={{fontWeight: "bold",fontWeight: "bold",fontSize: '1.7rem',}} >- Email: {teacherEmail}</Typography></textBox>
              <textBox style={{position:'relative',width: '100vw',height: '100vh',left:'290px',top:'-165px',}}><Typography style={{fontWeight: "bold",fontWeight: "bold",fontSize: '1.7rem',}} >- Số điện thoại: {teacherPhoneNumber}</Typography></textBox>
              

              <textBox style={{
                    position:'relative',
                    left:'40px',
                    top:'-400px',}}>
              <Typography style={{fontWeight: "bold"}} variant="h2" gutterBottom></Typography>
              <Typography style={{fontWeight: "bold", position:'relative'}} variant="h5">Teacher ID: {TeacherUserID.toString().padStart(5, '0')}</Typography>
              <Typography style={{fontWeight: "bold"}} variant="h2" gutterBottom></Typography>
              {/* <Button style={{
                color: '#FFFFFF', // Màu chữ của nút
                border: '0px solid #380B61', // Viền nằm trong nút
                borderRadius: '9px', // Bo tròn góc của viền
                padding: '10px 28px',
                display: 'flex', // Sử dụng flexbox để căn chỉnh
                alignItems: 'center', 
                textTransform: 'none',
                '&: hover': { backgroundColor: '#FFFFFF'},
              }}><SettingsIcon/><Typography style={{fontSize: '1.4rem',fontWeight: 'bold',}} paddingLeft={1}>Chỉnh sửa</Typography></Button>
              <Button style={{
                fontSize: '1.4rem', // Kích thước của nút
                color: '#FFFFFF', // Màu chữ của nút
                border: '0px solid #380B61', // Viền nằm trong nút
                borderRadius: '9px', // Bo tròn góc của viền
                padding: '10px 61px',
                display: 'flex', // Sử dụng flexbox để căn chỉnh
                alignItems: 'center', 
                fontWeight: 'bold',
                textTransform: 'none',
                '&: hover': { backgroundColor: '#FFFFFF'},
              }}><SaveIcon/><Typography style={{fontSize: '1.4rem',fontWeight: 'bold',}} paddingLeft={1}>Lưu</Typography></Button> */}

          </textBox>


          </Box>
        </Grid>








        <Grid item xs={6}>
        <Box style = {{
            width: '30vw', // Chiếm 30% chiều rộng của viewport
            height: '30vh', // Chiệm 25% chiều cao của viewport
            fontSize: '1.0rem',
            color: '#380B61',
            backgroundImage: 'url("/gradient8.jpg")',
            backgroundSize: 'cover',
            borderRadius: '10px',
            justifyContent: 'center',
            alignItems: 'center',
            fontWeight: 'bold',
            position: 'relative',
            top: '-4vh', // Điều chỉnh vị trí theo tỉ lệ
            left: '12vw',
          }}>
             <textBox style={{
                    position:'relative',
                    left:'5px',
                    top:'40px',}}>
              <Typography align='center' style={{fontWeight: "bold", position:'relative'}} variant="h4">Tình trạng giảng viên</Typography>
              </textBox>
              <textBox style={{
                    position:'relative',
                    left:'5px',
                    top:'80px',
                    }}>
              <Typography align='center' style={{fontWeight: "bold",color:'#AE2929'}} variant="h3">{teacherIsAvailable?("Đang dạy học"):("Đã tốt nghiệp")}</Typography>
              </textBox>
          </Box>
          <Box style = {{
            width: '30vw', // Chiếm 30% chiều rộng của viewport
            height: '38vh', // Chiệm 25% chiều cao của viewport
            fontSize: '1.0rem',
            color: '#380B61',
            backgroundImage: 'url("/gradient8.jpg")',
            backgroundSize: 'cover',
            borderRadius: '10px',
            justifyContent: 'center',
            alignItems: 'center',
            fontWeight: 'bold',
            position: 'relative',
            top: '-2vh', // Điều chỉnh vị trí theo tỉ lệ
            left: '12vw',

          }}>
            <textBox style={{
                    position:'relative',
                    left:'5px',
                    top:'30px',}}>
              <Typography align='center' style={{fontWeight: "bold", position:'relative'}} variant="h4">Môn Giảng Dạy</Typography>
              </textBox>
              <textBox style={{
                    position:'relative',
                    left:'5px',
                    top:'50px',
                    }}>
              <Typography align='center' style={{fontWeight: "bold", color:'#AE2929'}} variant="h4">{teacherCourseName}</Typography>
              </textBox>
              <textBox style={{
                    position:'relative',
                    left:'5px',
                    top:'70px',}}>
              <Typography align='center' style={{fontWeight: "bold", position:'relative'}} variant="h4">Mã Môn Học</Typography>
              </textBox>
              <textBox style={{
                    position:'relative',
                    left:'5px',
                    top:'90px',
                    }}>
              <Typography align='center' style={{fontWeight: "bold", color:'#AE2929'}} variant="h4">{teacherMainCourseId}</Typography>
              </textBox>
          </Box>
        </Grid>
      </Grid>


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

export default StudentInFo