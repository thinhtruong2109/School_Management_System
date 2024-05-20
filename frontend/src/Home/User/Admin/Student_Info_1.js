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
import {useNavigate,useLocation}  from 'react-router-dom';
import { styled} from '@mui/material';
import axios from 'axios'; 
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Grid from '@mui/material/Grid';
import LogoutIcon from '@mui/icons-material/Logout';
import StarExplosion from './Starbg'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SettingsIcon from '@mui/icons-material/Settings';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';

function StudentInFo() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const StudentUserID = queryParams.get('studentId');
    const SearchLabel = () => (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span></span>
      </div>
    );
  const navigate = useNavigate();

  const handleHomeClick = () => {
    // Hiển thị ô vuông khi bấm nút SignUp
      navigate('/home')
  };
  const handleRefresh = (e)=>
  {
    setShowForm(false);
  }

  const handleStudentHome = () =>
  {
    navigate('/home/admin/QuanLyStudent')
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
  localStorage.removeItem('StudentUserID');
  localStorage.removeItem('StudentName');
  navigate('/home')
  }

//   const StudentUserID = localStorage.getItem('StudentUserID');



  const [studentName, setStudentName] = useState('');
  const [studentID, setStudentID] = useState('');
  const [studentAge, setStudentAge] = useState('');
  const [studentGender, setStudentGender] = useState('');
  const [studentDateOfBirth, setStudentDateOfBirth] = useState('');
  const [studentPlaceOfBirth, setStudentPlaceOfBirth] = useState('');
  const [studentCitizenIdentification, setStudentCitizenIdentification] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPhoneNumber, setStudentPhoneNumber] = useState('');
  const [studentIsStudy, setStudentIsStudy] = useState(false); // Giả sử ban đầu là false
//   const handleSave = () => {
//     setIsEditing(false);
//   };
//   <Button variant="contained" color="primary" onClick={handleSave}>
//   Save
// </Button>
//   const [isEditing, setIsEditing] = useState(false);
//   const handleEdit = () => {
//     setIsEditing(true);
//   };
//   <Button variant="outlined" color="primary" onClick={handleEdit}>
//   Edit
// </Button>

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        console.log(StudentUserID)
        const response = await axios.get(`http://localhost:8080/student/studentId/${StudentUserID}`);
        const { data } = response.data;
        setStudentName(data.name);
        let formattedNumber = data.id.toString().padStart(5, '0');
        setStudentID(formattedNumber);
        setStudentAge(data.age);
        setStudentGender(data.gender);
        setStudentDateOfBirth(data.dateOfBirth);
        setStudentPlaceOfBirth(data.placeOfBirth);
        setStudentCitizenIdentification(data.citizenIdentification);
        setStudentEmail(data.email);
        setStudentPhoneNumber(data.phoneNumber);
        setStudentIsStudy(data.isStudy);
        
      } catch (error) {
        console.error('Error fetching student data:',);
      }
    };

    if (StudentUserID) 
    {
      fetchStudent();
    }
  }, [StudentUserID]);





  const [studentGPA, setstudentGPA] = useState('');

  useEffect(() => {
    const fetchStudentGPA = async () => {
      try {
        console.log(StudentUserID)
        const response = await axios.get(`http://localhost:8080/student/${StudentUserID}/credits-gpa`);
        const { data } = response.data;
        console.log(data)
        setstudentGPA(data.gpaOnScaleFour);
        
      } catch (error) {
        console.error('Error fetching student data:',);
      }
    };

    if (StudentUserID) 
    {
      fetchStudentGPA();
    }
  }, [StudentUserID]);


 
  // Các trường thông tin sinh viên khác


  // Kiểm tra nếu student chưa được tải
  const [ Notification, setNotification] = useState(false);
  const [ Notification_1, setNotification_1] = useState(false);
  const [ Notification_2, setNotification_2] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleSuccessClose = () => {
    setNotification(false);
    setNotification_1(false);
    setNotification_2(false);
  };
  const handleSuccess= () => {

      window.location.reload();
    
  };
  function EditStudentForm({ student, onUpdate }) {
    const [updatedStudent, setUpdatedStudent] = useState({ 
      id: StudentUserID,
      name: '',
      age: '',
      gender: '',
      dateOfBirth: '',
      placeOfBirth: '',
      citizenIdentification: '',
      email: '',
      phoneNumber: '',
      isStudy: true,});
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setUpdatedStudent((prevStudent) => ({
        ...prevStudent,
        [name]: value,
      }));
    };
    async function updateStudent(updatedStudent) {
      try {
        const response = await axios.put('http://localhost:8080/student', updatedStudent);
        const { status, message, data } = response.data;
        if (status === 'success') {
          // Thông báo thành công và trả về dữ liệu sinh viên đã được cập nhật
          // alert('Cập nhật thông tin sinh viên thành công');
          setNotification(true);
          setNotification_1(true);
          return data;
        } else {
          throw new Error(message);
        }
      } catch (error) {
        console.error('Failed to update student:', error);
        // Hiển thị thông báo lỗi
        // alert('Đã xảy ra lỗi khi cập nhật thông tin sinh viên');
        setNotification(true);
        setNotification_2(true);
        return null;
      }
    }
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const updatedData = await updateStudent(updatedStudent);
        if (updatedData) {
          onUpdate(updatedData);
        }
      } catch (error) {
        console.error('Failed to update student:', error);
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
            value={updatedStudent.name}
            onChange={handleChange}
            inputMode="text"
            required
          />
          <TextField
            label="Age"
            name="age"
            type="number"
            value={updatedStudent.age}
            onChange={handleChange}
            inputMode="numeric"
            required
          />
          <TextField
            label="Gender"
            name="gender"
            value={updatedStudent.gender}
            onChange={handleChange}
            inputMode="text"
            required
          />
          <TextField
            label="Date of Birth:         "
            name="dateOfBirth"
            type="date"
            value={updatedStudent.dateOfBirth}
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
            value={updatedStudent.placeOfBirth}
            onChange={handleChange}
            inputMode="text"
            required
          />
          <TextField
            label="Citizen Identification"
            name="citizenIdentification"
            value={updatedStudent.citizenIdentification}
            onChange={handleChange}
            inputMode="text"
            required
          />
          <TextField
            label="Email"
            name="email"
            value={updatedStudent.email}
            onChange={handleChange}
            inputMode="email"
            required
          />
          <TextField
            label="Phone Number"
            name="phoneNumber"
            value={updatedStudent.phoneNumber}
            onChange={handleChange}
            inputMode="tel"
            required
          />
        </div>
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
        }} type="submit" ><SendIcon/><Typography paddingLeft={1.5} style={{fontWeight: 'bold'}}>Xác nhận</Typography></RegistButton>
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
        {StudentUserID ? (
<>
        <AppBar position='static'>
            <Toolbar  className='custom-toolbar' sx={{ bgcolor: 'transparent' ,}}>
            <img src="/Hogwarts.png" alt="Icon" width="80" height="50" /> 
                <Typography variant='h5' style={{ fontWeight: 'bold' }} align='left' sx={{flexGrow:11} } > HCM Hogwarts  University </Typography>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ flexGrow: 400 }}>
                    <Stack direction="row">
                      <FunctionButton onClick={handleStudentHome}> Về trang trước </FunctionButton>
                    <Stack direction="row">
                      <FunctionButton onClick={handleShowForm}>Chỉnh Sửa Thông Tin</FunctionButton>
                    </Stack>
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
        {showForm && <EditStudentForm />}
      <Typography variant='h2' gutterBottom></Typography>


      <Grid container p={13} spacing={10}>
      {/* p la kcach giua grid va mep cua giao dien spacing la kach giua 2 grid voi nhau */}

        <Grid item xs={6}>
          <Box style = {{
            width: '55vw', // Chiếm 70% chiều rộng của viewport
            height: '550px', // Chiếm 50% chiều cao của viewport
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
          {studentGender === "F" ? (
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
              <textBox style={{position:'relative',width: '100vw',height: '100vh',left:'290px',top:'-200px',}}><Typography style={{fontWeight: "bold",fontWeight: "bold",fontSize: '1.7rem'}}>- Tên: {studentName} </Typography></textBox>
              <textBox style={{position:'relative',width: '100vw',height: '100vh',left:'290px',top:'-195px',}}><Typography style={{fontWeight: "bold",fontWeight: "bold",fontSize: '1.7rem',}} >- Tuổi: {studentAge}</Typography></textBox>
              <textBox style={{position:'relative',width: '100vw',height: '100vh',left:'290px',top:'-190px',}}><Typography style={{fontWeight: "bold",fontWeight: "bold",fontSize: '1.7rem',}} >- CCCD: {studentCitizenIdentification}</Typography></textBox>
              <textBox style={{position:'relative',width: '100vw',height: '100vh',left:'290px',top:'-185px',}}>{studentGender==="F"?(<Typography style={{fontWeight: "bold",fontWeight: "bold",fontSize: '1.7rem',}} >- Giới tính: Nữ</Typography>):(<Typography style={{fontWeight: "bold",fontWeight: "bold",fontSize: '1.7rem',}} >- Giới tính: Nam</Typography>)}</textBox>
              <textBox style={{position:'relative',width: '100vw',height: '100vh',left:'290px',top:'-180px',}}><Typography style={{fontWeight: "bold",fontWeight: "bold",fontSize: '1.7rem',}} >- Ngày sinh: {studentDateOfBirth}</Typography></textBox>
              <textBox style={{position:'relative',width: '100vw',height: '100vh',left:'290px',top:'-175px',}}><Typography style={{fontWeight: "bold",fontWeight: "bold",fontSize: '1.7rem',}} >- Nơi sinh: {studentPlaceOfBirth}</Typography></textBox>
              <textBox style={{position:'relative',width: '100vw',height: '100vh',left:'290px',top:'-170px',}}><Typography style={{fontWeight: "bold",fontWeight: "bold",fontSize: '1.7rem',}} >- Email: {studentEmail}</Typography></textBox>
              <textBox style={{position:'relative',width: '100vw',height: '100vh',left:'290px',top:'-165px',}}><Typography style={{fontWeight: "bold",fontWeight: "bold",fontSize: '1.7rem',}} >- Số điện thoại: {studentPhoneNumber}</Typography></textBox>
              

              <textBox style={{
                    position:'relative',
                    left:'40px',
                    top:'-400px',}}>
              <Typography style={{fontWeight: "bold"}} variant="h2" gutterBottom></Typography>
              <Typography style={{fontWeight: "bold", position:'relative'}} variant="h5">Student ID: {studentID}</Typography>
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
            height: '250px', // Chiệm 25% chiều cao của viewport
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
              <Typography align='center' style={{fontWeight: "bold", position:'relative'}} variant="h4">Tình trạng sinh viên</Typography>
              </textBox>
              <textBox style={{
                    position:'relative',
                    left:'5px',
                    top:'80px',
                    }}>
              <Typography align='center' style={{fontWeight: "bold",color:'#AE2929'}} variant="h3">{studentIsStudy?("Đang học"):("Đã tốt nghiệp")}</Typography>
              </textBox>
          </Box>
          <Box style = {{
            width: '30vw', // Chiếm 30% chiều rộng của viewport
            height: '250px', // Chiệm 25% chiều cao của viewport
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
                    top:'40px',}}>
              <Typography align='center' style={{fontWeight: "bold", position:'relative'}} variant="h4">Điểm Trung Bình Hệ 4</Typography>
              </textBox>
              <textBox style={{
                    position:'relative',
                    left:'5px',
                    top:'80px',
                    }}>
              <Typography align='center' style={{fontWeight: "bold", color:'#AE2929'}} variant="h3">{studentGPA}</Typography>
              </textBox>
          </Box>
        </Grid>
      </Grid>

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
                    <Typography style={{ fontWeight: 'bold' }} variant='h4' gutterBottom>
                      Thông Báo !
                    </Typography>
                    {Notification_1 && (
                      <>
                        <Typography variant='h3' gutterBottom></Typography>
                        <Typography style={{}} variant='h5'>
                        Chỉnh sửa thông tin sinh viên thành công
                      
                        </Typography>
                        <IconButton
                          style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            color: '#fff',
                          }}
                          onClick={() => handleSuccess()}
                        >
                          <CloseIcon />
                        </IconButton>
                      </>
                    )}
                    {Notification_2 && (
                      <>
                        <Typography variant='h3' gutterBottom></Typography>
                        <Typography style={{}} variant='h5'>
                        Chỉnh sửa thông tin sinh viên thất bại. Hãy đảm bảo không để trùng thông tin
                        </Typography>
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
                      </>
                    )}
                  </Stack>
                  
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
  )
}

export default StudentInFo