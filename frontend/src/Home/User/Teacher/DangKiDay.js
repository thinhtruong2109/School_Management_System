import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import React, { useState, useEffect,useRef } from 'react';
import TextField from '@mui/material/TextField';
import {useNavigate}  from 'react-router-dom';
import { styled} from '@mui/material';
import axios from 'axios'; 
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import 'react-big-calendar/lib/css/react-big-calendar.css';
// import StudentInfo from './StudentInfo';
import LogoutIcon from '@mui/icons-material/Logout';
import StarExplosion from './Starbg'
import { useLocation } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import GetAppIcon from '@mui/icons-material/GetApp';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import * as xlsx from 'xlsx';
function DanhSachThanhVien()
{
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const studentIds = searchParams.get('studentIds');
  const IdMonHoc = searchParams.get('IdMonHoc');
  const studentIdsArray = Array.from(JSON.parse(studentIds));
  const handleHomeClick = () => {
    // Hiển thị ô vuông khi bấm nút SignUp
      navigate('/home/teachers/LichDayHoc')
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
    const handleTeacherInfo = (e) => {
        navigate('/home/teachers/TeacherInFo')
    }
    const handleLogOut = (e) =>
    {
      localStorage.removeItem('TeacherUserID');
      localStorage.removeItem('TeacherName');
      navigate('/home')
    }
    
      // const handleNhapDiem = (e) => {
      //     navigate('/home/teachers/NhapDiem');
      // }
    // Trong trang làm việc
    const TeacherUserID = localStorage.getItem('TeacherUserID');
    const[TeacherName, setTeacherName] = useState('');
    // const TeacherName =localStorage.getItem("TeacherUserName");
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
    const tableBodyRef = useRef(null);
    const tableHeadRef = useRef(null);

    const [isFormVisible, setIsFormVisible] = useState(false);
    const [currentStudentId, setCurrentStudentId] = useState(null);

    const handleHuy = () => {
      setIsFormVisible(false);
    };

    const handleNhapDiem = (studentId) => {
      setCurrentStudentId(studentId);
      setIsFormVisible(true);
    };




    
    const [ Notification, setNotification] = useState(false);

    const handleSuccessClose = () => {
      setNotification(false);
     fetchThanhVien();
      

    };
    function NhapDiemChoStudent()
    {
      const [inputScores, setInputScores] = useState({ score1: '', score2: '', score3: '', score4: '' });
      const handleScoreChange = (event) => {
        const { name, value } = event.target;
        setInputScores((prevInputScores) => ({
          ...prevInputScores,
          [name]: value,
        }));
      };
      const handleSubmitScores = async () => {
        const { score1, score2, score3, score4 } = inputScores;
        // Xử lý các điểm nhập vào, ví dụ lưu vào cơ sở dữ liệu hoặc thực hiện các hoạt động khác
        console.log(`Điểm của học sinh ${currentStudentId}: ${score1}, ${score2}, ${score3}, ${score4}`);
        try {
          const response = await axios.put(`http://localhost:8080/sheetmark/assignScores?studentId=${currentStudentId}&courseClassId=${IdMonHoc}&assignmentScore=${score1}&projectScore=${score2}&midTermScore=${score3}&finalExamScore=${score4}`);
          console.log(response.data); // In thông tin phản hồi từ API (tùy thuộc vào định dạng phản hồi của API)
          // Cập nhật trạng thái và đóng form
          setIsFormVisible(false);
          setCurrentStudentId(null);
          setInputScores({ score1: '', score2: '', score3: '', score4: '' });
          setNotification(true);
        } catch (error) {
          console.error(error); // Xử lý lỗi nếu có
        }
      };
          return (
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
              >
                <div
                  style={{
                    border: '0px solid #380B61', // Viền nằm trong nút
                    backgroundImage: 'url("/gradient.jpg")',
                    backgroundSize: 'cover',
                    padding: '50px',
                    borderRadius: '10px',
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                    zIndex: 10,
                  }}
                >
                  <h2 >Nhập điểm cho học sinh với ID : {currentStudentId}</h2>
                  
             
                    
                  <form>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                      <div style={{ marginRight: '20px' }}>
                        <TextField
                          id="score1"
                          name="score1"
                          label="Assignment Score"
                          value={inputScores.score1}
                          onChange={handleScoreChange}
                        />
                      </div>
                      <div>
                        <TextField
                          id="score2"
                          name="score2"
                          label="Project Score"
                          value={inputScores.score2}
                          onChange={handleScoreChange}
                        />
                      </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                      <div style={{ marginRight: '20px' }}>
                        <TextField
                          id="score3"
                          name="score3"
                          label="MidTerm Score"
                          value={inputScores.score3}
                          onChange={handleScoreChange}
                        />
                      </div>
                      <div>
                        <TextField
                          id="score4"
                          name="score4"
                          label="FinalExam Score"
                          value={inputScores.score4}
                          onChange={handleScoreChange}
                        />
                      </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>

                      <FunctionButton style={{width: '150px', // Độ rộng của Box
                      height: '50px',
                      fontSize: '1.0rem',
                      alignItems:'center', // Kích thước của nút
                      color: '#FFFFFF/', // Màu chữ của nút
                      borderRadius: '10px', // Bo tròn góc của viền
                      fontWeight: 'bold',
                      top:'10px',
                      textTransform: 'none',
                      '&: hover': { backgroundColor: '#BCA9F5'}}} 
                      variant="contained" color="primary" onClick={handleSubmitScores}>
                        <Typography  style={{fontWeight: 'bold'}}>Lưu điểm</Typography>
                      
                      </FunctionButton>
                      <Box style={{width:'50px'}}>

                      </Box>
                      <FunctionButton style={{
                        width: '150px', // Độ rộng của Box
                        height: '50px',
                        fontSize: '1.0rem',
                        alignItems:'center', // Kích thước của nút
                        color: 'black', // Màu chữ của nút
                        borderRadius: '10px', // Bo tròn góc của viền
                        fontWeight: 'bold',
                        top:'10px',
                        textTransform: 'none',
                        '&: hover': { backgroundColor: 'blue'}
                      }} color="primary" onClick={() => handleHuy()}>
                        <Typography  style={{fontWeight: 'bold'}}>Huỷ bỏ</Typography>
                      </FunctionButton>
                  
                    </div>
                  </form>
                </div>

              </div>


          );
    }

  
 
    const [dummyData, setDummyData] = useState([]);
    const fetchThanhVien = async() => {
      try {
        
        const tableRows = [];
        for (let i = 0; i < studentIdsArray.length; i ++) {
            const studentId = studentIdsArray[i];
            // const response = await axios.get(`http://localhost:8080/student/studentId/${studentId}`);
            const response2 = await axios.get(`http://localhost:8080/sheetmark/student_courseclass?studentId=${studentId}&courseClassId=${IdMonHoc}`);
            const {data } = response2.data;
          
            const row = {
              ID: data[0].studentId,
              Name: data[0].studentName,
              assignmentScore: data[0].assignmentScore,
              projectScore: data[0].projectScore,
              midTermScore: data[0].midTermScore,
              finalExamScore: data[0].finalExamScore,
              finalGrade: data[0].finalGrade.toFixed(2),
            };
            console.log("123:  .",row.assignmentScore)
            tableRows.push(row);
          }
          setDummyData(tableRows);
      } 
      
      
      catch (error) {
        console.error('Error fetching student data:', error);
        alert('fail');
      }
    }
    useEffect(() => {
        if (TeacherUserID) 
        {
          fetchTeacher();
          fetchThanhVien();
        }
      }, [TeacherUserID]);
      
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
        xlsx.writeFile(workbook, 'DanhSachSinhVien.xlsx');
      };
      

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
                            <FunctionButton onClick={handleHomeClick}>Về trang trước</FunctionButton>
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
         
         
    <Typography variant='h1' gutterBottom></Typography>
      <Stack direction='row'>
        <Box style = {{
          width: '280px', // Độ rộng của Box
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
          }}> Danh sách thành viên</Typography>
          
        </Box>
        <Button style={{
              width: '280px', // Độ rộng của Box
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
          onClick={exportToExcel}> <GetAppIcon /><Typography paddingLeft={0.7} ></Typography>Xuất Excel</Button>
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
                <TableCell align='center' style={{ fontWeight: "bold", borderRight: "1px solid rgba(224, 224, 224, 1)", width: "100px" }}>ID</TableCell>
                <TableCell align='center' style={{ fontWeight: "bold", borderRight: "1px solid rgba(224, 224, 224, 1)", width: "200px" }}>Tên</TableCell>
                {/* <TableCell align='center' style={{ fontWeight: "bold", borderRight: "1px solid rgba(224, 224, 224, 1)", width: "100px" }}>Email</TableCell>
                <TableCell align='center' style={{ fontWeight: "bold", borderRight: "1px solid rgba(224, 224, 224, 1)", width: "100px" }}>Số điện thoại</TableCell> */}
                <TableCell align='center' style={{ fontWeight: "bold", borderRight: "1px solid rgba(224, 224, 224, 1)", width: "100px" }}>Assignment</TableCell>
                <TableCell align='center' style={{ fontWeight: "bold", borderRight: "1px solid rgba(224, 224, 224, 1)", width: "100px" }}>Project</TableCell>
                <TableCell align='center' style={{ fontWeight: "bold", borderRight: "1px solid rgba(224, 224, 224, 1)", width: "100px" }}>MidTerm</TableCell>
                <TableCell align='center' style={{ fontWeight: "bold", borderRight: "1px solid rgba(224, 224, 224, 1)", width: "100px" }}>Final</TableCell>
                <TableCell align='center' style={{ fontWeight: "bold", borderRight: "1px solid rgba(224, 224, 224, 1)", width: "100px" }}>Average</TableCell>
                <TableCell align='center' style={{ fontWeight: "bold", borderRight: "1px solid rgba(224, 224, 224, 1)", width: "100px" }}>Nhập điểm</TableCell>
                {/* Thêm các TableCell khác cho các cột */}
              </TableRow>
            </TableHead>
            <TableBody ref={tableBodyRef}>
              {/* Lặp qua dữ liệu và tạo các TableRow chứa TableCell */}
              {dummyData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell align='center' style={{width: '10px' ,borderRight: "1px solid rgba(224, 224, 224, 1)"}}>{row.ID}</TableCell>
                  <TableCell style={{width: '130px',borderRight: "1px solid rgba(224, 224, 224, 1)"}}>{row.Name}</TableCell>
                  <TableCell align='center' style={{width: '20px',borderRight: "1px solid rgba(224, 224, 224, 1)"}}>{row.assignmentScore}</TableCell>
                  <TableCell align='center' style={{width: '20px',borderRight: "1px solid rgba(224, 224, 224, 1)"}}>{row.projectScore}</TableCell>
                  <TableCell align='center' style={{width: '20px',borderRight: "1px solid rgba(224, 224, 224, 1)"}}>{row.midTermScore}</TableCell>
                  <TableCell align='center' style={{width: '20px',borderRight: "1px solid rgba(224, 224, 224, 1)"}}>{row.finalExamScore}</TableCell>
                  <TableCell align='center' style={{width: '20px',borderRight: "1px solid rgba(224, 224, 224, 1)"}}>{row.finalGrade}</TableCell>
                  <TableCell align='center' style={{width: '20px',borderRight: "1px solid rgba(224, 224, 224, 1)"}}>
                     <RegistButton style={{fontSize:'0.9rem'}} onClick={() => handleNhapDiem(row.ID)}>Nhập điểm</RegistButton>
                    </TableCell>
                </TableRow>
              ))}
              
            </TableBody>
          </Table>
          </TableContainer>
      </Box>
      {isFormVisible && <NhapDiemChoStudent/>}

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
                        <Typography variant='h3' gutterBottom></Typography>
                        <Typography style={{}} variant='h5'>
                          Nhập điểm cho hoc sinh thành công
                        </Typography>
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
export default DanhSachThanhVien
