import { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import "./App.css";

// 로그인 + 회원가입 페이지
function LoginSignup() {
  const [login, setLogin] = useState({ id: "", password: "" });
  const [signup, setSignup] = useState({ id: "", password: "" });
  const [msg, setMsg] = useState("");
  const [signupMode, setSignupMode] = useState(false);
  const navigate = useNavigate();

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLogin((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignup((prev) => ({ ...prev, [name]: value }));
  };

  // 로그인 처리
  const handleLogin = () => {
    axios
      .post("http://10.5.5.5:8080/auth/login", login)
      .then(() => {
        setMsg("✅ 로그인 성공!");
      })
      .catch(() => {
        setMsg("❌ 로그인 실패");
      });
  };

  // 회원가입 처리
  const handleSignup = () => {
    axios
      .post("http://10.5.5.5:8080/auth/signup", signup)
      .then(() => {
        setMsg("✅ 회원가입 성공!");
        setSignupMode(false); // 성공 후 로그인 화면으로 전환
        navigate("/auth/login");
      })
      .catch(() => {
        setMsg("❌ 회원가입 실패");
      });
  };

  return (
    <div className="container">
      <h2>로그인 / 회원가입</h2>

      {!signupMode ? (
        <>
          {/* 로그인 폼 */}
          <input
            type="text"
            name="id"
            placeholder="아이디"
            value={login.id}
            onChange={handleLoginChange}
          />
          <br />
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={login.password}
            onChange={handleLoginChange}
          />
          <br />
          <button onClick={handleLogin}>로그인</button>
          <button onClick={() => setSignupMode(true)}>회원가입</button>
        </>
      ) : (
        <>
          {/* 회원가입 폼 */}
          <input
            type="text"
            name="id"
            placeholder="아이디"
            value={signup.id}
            onChange={handleSignupChange}
          />
          <br />
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={signup.password}
            onChange={handleSignupChange}
          />
          <br />
          <button onClick={handleSignup}>회원가입 완료</button>
          <button
            onClick={() => {
              setSignupMode(false);   // ✅ 다시 로그인 화면으로 전환
              navigate("/auth/login"); // 경로도 로그인으로 이동
            }}
          >
            취소
          </button>
        </>
      )}

      <p>{msg}</p>
    </div>
  );
}

// 최상위 App
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* / 와 /auth/login 둘 다 로그인/회원가입 페이지로 연결 */}
        <Route path="/" element={<LoginSignup />} />
        <Route path="/auth/login" element={<LoginSignup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
