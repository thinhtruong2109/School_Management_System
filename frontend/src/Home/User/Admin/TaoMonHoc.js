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
import axios from 'axios'; 
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import WarningIcon from '@mui/icons-material/Warning';
function TaoMonHoc() {
  
  const handleLogOut = (e) =>{
    localStorage.removeItem('AdminUserID');
    localStorage.removeItem('AdminName');
    navigate('/home');
  }
  const handleHomeClick = (e) =>{
      navigate('/home');
  }
  const handleTrangChu = (e) =>{
    navigate('/home/admin');
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
  const FunctionButton_2 = styled(Button)({
    fontSize: '1.0rem',
    color: '#FFFFFF',
    border: '0px solid #380B61',
    borderRadius: '3px',
    padding: '75px 200px',
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold',
    textTransform: 'none',
    whiteSpace: 'nowrap', // Ngăn việc ngắt từ tự động
    wordBreak: 'break-word', // Cho phép các từ trên cùng một hàng
    '&:hover': { background: 'linear-gradient( to top, #F8C3E6, #9D55A2)'},
  })

  const [ Notification, setNotification] = useState(false);
  const [ Notification_1, setNotification_1] = useState(false);
  const [ Notification_2, setNotification_2] = useState(false);
  const [ Notification_3, setNotification_3] = useState(false);
  const [ Notification_4, setNotification_4] = useState(false);
  const [ Notification_5, setNotification_5] = useState(false);
  const [ Notification_6, setNotification_6] = useState(false);
  const [ Notification_7, setNotification_7] = useState(false);
  const [ Notification_8, setNotification_8] = useState(false);
  const [ Notification_9, setNotification_9] = useState(false);
  const handleSuccessClose = () => {
    setNotification(false);
    setNotification_1(false);
    setNotification_2(false);
    setNotification_3(false);
    setNotification_4(false);
    setNotification_5(false);
    setNotification_6(false);
    setNotification_7(false);
    setNotification_8(false);
    setNotification_9(false);
  };
    const handleMoPhieuDangKi = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:8080/coursetoregistration/check');
      const { status, message } = response.data;
      if (status === 'success') {
        if (message === 'Registration is not available') {
          // Phiếu đăng kí chưa tồn tại, tiến hành tạo phiếu
          await axios.post('http://localhost:8080/courses/startForRegist');
          setNotification(true);
          setNotification_1(true);
        } else if (message === 'Registration is available') {

          setNotification(true);
          setNotification_2(true);
        }
      } else {
        throw new Error('Failed to open registration');
      }
    } catch (error) {
      console.error('Failed to open registration:', error);
      alert('Đã xảy ra lỗi khi tạo phiếu đăng kí môn học');
    }
  };
  const handleKiemTraGV = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:8080/coursetoregistration/check');
      const { status, message } = response.data;
      if (status === 'success') {
        if (message === 'Registration is not available') {
          // Phiếu đăng kí chưa tồn tại, tiến hành tạo phiếu
          // alert('Chưa có môn học, vui lòng mở phiếu đăng kí môn.');
          setNotification(true);
          setNotification_3(true);
        } else if (message === 'Registration is available') {
          // Phiếu đăng kí đã tồn tại
            const response_1 = await axios.get('http://localhost:8080/coursetoregistration/check-teachers');
            const { status: status_1 , message: message_1, data} = response_1.data;
            if (status_1 === 'success') {
              // alert(message_1);
              // alert('Tất cả các khóa học đều có đủ giáo viên.');
              setNotification(true);
              setNotification_4(true);
            } else {
              // alert(message_1);
              // alert(data);
              
              // alert('Một số khóa học không đủ giáo viên.');

              setNotification(true);
              setNotification_5(true);
            }
        }
      } else {
        throw new Error('Failed to check teacher');
      }
    } catch (error) {
      console.error('Failed to check teacher:', error);
      alert('Đã xảy ra lỗi khi kiểm tra phiếu số lượng giáo viên.');
    }
  };
  const handleMoLop = async(e) =>{
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:8080/coursetoregistration/check');
      const { status, message } = response.data;
      if (status === 'success') {
        if (message === 'Registration is not available') {
          // Phiếu đăng kí chưa tồn tại, tiến hành tạo phiếu
          // alert('Chưa có môn học, vui lòng mở phiếu đăng kí môn.');
          setNotification(true);
          setNotification_3(true);
        } else if (message === 'Registration is available') {
          // Phiếu đăng kí đã tồn tại
            const response_1 = await axios.get('http://localhost:8080/coursetoregistration/process-all-without-teacher');
            const { status: status_1 } = response_1.data;
            if (status_1 === 'success') {
              // alert('Tất cả các đăng ký khóa học được xử lý thành công.');
              setNotification(true);
              setNotification_6(true);
            } else {
              // alert('Học kì cũ vẫn đang tiếp diễn. Hãy đảm bảo tất cả các lớp học kết thúc.');
              setNotification(true);
              setNotification_7(true);
            }
        }
      } else {
        throw new Error('Failed to open class');
      }
    } catch (error) {
      console.error('Failed to open class:', error);
      alert('Đã xảy ra lỗi khi kiểm tra phiếu đăng kí môn học.');
    }
  }
  const handleBatDauHocKi = async(e) =>{
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:8080/courseclass/start-new-semester');
      const { status : status } = response.data;
      if (status === 'success')
        {
          // alert('Học kỳ mới đã bắt đầu thành công và tất cả các lớp học theo kế hoạch hiện đang được tiến hành.')
          setNotification(true);
          setNotification_8(true);
        }
    } catch (error) {
      console.error('Failed to open class:', error);
      alert('Đã xảy ra lỗi khi kiểm tra phiếu đăng kí môn học.');
    }
  }
  const handleKetThucHocKi = async(e) =>{
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/courseclass/endSemester');
      const { status } = response.data;
      if (status === 'success') {
          // alert('Đã xóa tất cả phiếu đăng kí môn học thành công');  
          setNotification(true);
          setNotification_9(true);
      } 
    } catch (error) {
      // console.error('Failed to open registration:', error);
      // alert('Không có phiếu đăng khi để xóa');
    }
  }
  const AdminUserID = localStorage.getItem('AdminUserID');
  const AdminName =localStorage.getItem("AdminName");
  const navigate = useNavigate();
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
                      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ flexGrow: 100 }}> 
                        <Stack direction="row">
                            <FunctionButton onClick={handleTrangChu}>Trang Chủ</FunctionButton>
                            <Stack direction="row">
                              <FunctionButton
                              style={{
                                backgroundColor:'#E15B30'
                      
                              }}
                               onClick={handleKetThucHocKi}><WarningIcon/><Typography style={{
                                  fontSize: '1.0rem', // Kích thước của nút
                                  color: '#FFFFFF', // Màu chữ của nút
                                  border: '0px solid #380B61', // Viền nằm trong nút
                                  borderRadius: '3px', // Bo tròn góc của viền
                                  padding: '10px 10px',
                                  display: 'flex', // Sử dụng flexbox để căn chỉnh
                                  alignItems: 'center', 
                                  fontWeight: 'bold',
                                  textTransform: 'none',

                            
                        }}  >Kết Thúc Học Kì</Typography></FunctionButton>
                            </Stack>
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
            </AppBar>,


            <div>
                <Typography variant='h1' gutterBottom/>

                <Typography gutterBottom style={{fontSize: '3.0rem', textAlign: 'center', fontWeight: 'bold', color: '#FFFFFF'}}>Bắt đầu học kì mới</Typography>

                <Typography variant='h1' gutterBottom/>


            
            </div>
            <Grid container spacing={15} alignItems="center" justifyContent="center" >
            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Box style={{zIndex:4}} sx={{ width: '400px', height: '200px', background: 'linear-gradient(to top left, #F8C3E6, #9D55A2)',  borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center',}}>
                    <FunctionButton_2 onClick={handleMoPhieuDangKi}>
                        <Typography paddingLeft={0.5} ></Typography>
                            BƯỚC 1: <br /> MỞ PHIẾU ĐĂNG KÍ MÔN HỌC
                        </FunctionButton_2>
                </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Box  style={{zIndex:4}} sx={{ width: '400px', height: '200px', background: 'linear-gradient(to bottom right, #F8C3E6, #9D55A2)', borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center',}}>
                        <FunctionButton_2  onClick={handleKiemTraGV}>
                        <Typography paddingLeft={0.5} ></Typography>
                        BƯỚC 2: <br /> KIỂM TRA SỐ LƯỢNG GIÁO VIÊN
                        </FunctionButton_2 >
                </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Box  style={{zIndex:4}} sx={{ width: '400px', height: '200px', background: 'linear-gradient(to bottom left, #F8C3E6, #9D55A2)', borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center',}}>
                        <FunctionButton_2 onClick={handleMoLop}>
                        <Typography paddingLeft={0.5} ></Typography>
                        BƯỚC 3: <br /> MỞ LỚP HỌC CHÍNH THỨC
                        </FunctionButton_2>
                </Box>
            </Grid>

            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Box  style={{zIndex:4}} sx={{ width: '400px', height: '200px', background: 'linear-gradient(to bottom, #F8C3E6, #9D55A2)', borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center',}}>
                        <FunctionButton_2 onClick={handleBatDauHocKi}>
                        <Typography paddingLeft={0.5} ></Typography>
                        BƯỚC 4: <br /> BẮT ĐẦU HỌC KÌ MỚI
                        </FunctionButton_2>
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
                          Đã tạo phiếu đăng kí môn học thành công
                        </Typography>
                      </>
                    )}
                    {Notification_2 && (
                      <>
                        <Typography variant='h3' gutterBottom></Typography>
                        <Typography style={{}} variant='h5'>
                          Phiếu đăng kí môn học đã được tạo
                        </Typography>
                      </>
                    )}
                    {Notification_3 && (
                      <>
                        <Typography variant='h3' gutterBottom></Typography>
                        <Typography style={{}} variant='h5'>
                        Chưa có môn học, vui lòng mở phiếu đăng kí môn
                        </Typography>
                      </>
                    )}
                    {Notification_4 && (
                      <>
                        <Typography variant='h3' gutterBottom></Typography>
                        <Typography style={{}} variant='h5'>
                        Tất cả các khóa học đều có đủ giáo viên
                        </Typography>
                      </>
                    )}
                    {Notification_5 && (
                      <>
                        <Typography variant='h3' gutterBottom></Typography>
                        <Typography style={{}} variant='h5'>
                        Một số khóa học không đủ giáo viên
                        </Typography>
                      </>
                    )}
                    {Notification_6 && (
                      <>
                        <Typography variant='h3' gutterBottom></Typography>
                        <Typography style={{}} variant='h5'>
                        Tất cả các đăng ký khóa học được xử lý thành công
                        </Typography>
                      </>
                    )}
                    {Notification_7 && (
                      <>
                        <Typography variant='h3' gutterBottom></Typography>
                        <Typography style={{}} variant='h5'>
                        Học kì cũ vẫn đang tiếp diễn. Hãy đảm bảo tất cả các lớp học kết thúc
                        </Typography>
                      </>
                    )}
                    {Notification_8 && (
                      <>
                        <Typography variant='h3' gutterBottom></Typography>
                        <Typography style={{}} variant='h5'>
                        Học kỳ mới đã bắt đầu thành công và tất cả các lớp học theo kế hoạch hiện đang được tiến hành
                        </Typography>
                      </>
                    )}
                    {Notification_9 && (
                      <>
                        <Typography variant='h3' gutterBottom></Typography>
                        <Typography style={{}} variant='h5'>
                        Tất cả các lớp học đang diễn ra đã kết thúc thành công
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
            </>
            ):(<Box align='center' direction='row' > 
            
            <Typography variant='h2' color='#FFFFFF' style={{ fontWeight: 'bold'  }}>Error: Unauthenticated </Typography>
            <FunctionButton onClick={handleHomeClick}>Về trang Đăng Nhập</FunctionButton>

        </Box>)
        }   

        </div>
    
    
  );
}

export default TaoMonHoc