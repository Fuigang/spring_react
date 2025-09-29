
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import './App.css';

// 로그인 페이지
function Login() {
  const [login, setLogin] = useState({ id: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = () => {
    axios.post("http://10.5.5.5:8080/auth/login", login)  // ✅ 서버 엔드포인트
      .then((resp) => {
        console.log("로그인 성공", resp.data);
        alert("로그인 성공");
      })
      .catch((err) => {
        console.error("로그인 실패", err);
        alert("로그인 실패 ㅠㅠ");
      });
  };

  return (
    <div className="container">
      <h2>로그인</h2>
      <input 
        type="text" 
        name="id"
        placeholder="아이디"
        value={login.id}
        onChange={handleChange}
      />
      <br />
      <input 
        type="password" 
        name="password"
        placeholder="패스워드"
        value={login.password}
        onChange={handleChange} 
      />
      <br />
      <button onClick={handleLogin}>login</button>
      <button>회원가입</button>
    </div>
  );
}





// 라우터 적용
function App() {
  return (
    <BrowserRouter>
    

      <Routes>

        <Route path="/auth/login" element={<Login />} />   {/* ✅ 로그인 경로 변경 */}
    
      </Routes>
    </BrowserRouter>
  );
}

export default App;
