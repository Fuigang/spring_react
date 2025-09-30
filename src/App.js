import { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import "./App.css";

const SingnupForm = ({ signup, onChange, onSignup, switchToLogin }) => {
  return (
    <>
      <input
        type="text"
        name="id"
        placeholder="아이디"
        value={signup.id}
        onChange={onChange}
      />
      <br />
      <input
        type="password"
        name="password"
        placeholder="비밀번호"
        value={signup.password}
        onChange={onChange}
      />
      <br />
      <button onClick={onSignup}>회원가입 완료</button>
      <button onClick={switchToLogin}>로그인으로</button>
    </>
  );
};

const LoginForm = ({ login, onChange, onLogin, switchToSignup }) => {
  return (
    <>
      <input
        type="text"
        name="id"
        placeholder="아이디"
        value={login.id}
        onChange={onChange}
      />
      <br />
      <input
        type="password"
        name="password"
        placeholder="비밀번호"
        value={login.password}
        onChange={onChange}
      />
      <br />
      <button onClick={onLogin}>로그인</button>
      <button onClick={switchToSignup}>회원가입</button>
      <button onClick={() => axios.get("http://10.5.5.5/auth/test")}>
        테스트
      </button>
    </>
  );
};

axios.defaults.withCredentials = true;

// 로그인 + 회원가입 페이지
function LoginSignup() {
  const [login, setLogin] = useState({ id: "", password: "" });
  const [signup, setSignup] = useState({ id: "", password: "" });

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

  // ✅ 로그인 처리 함수
  const handleLogin = () => {
    axios
      .post("http://10.5.5.5:80/auth/login", login, {
        headers: { "Content-Type": "application/json" },
      })
      .then((resp) => {
        console.log("서버 응답:", resp.data);
      })
      .catch((err) => {
        console.error("로그인 요청 에러:", err);
      });
  };

  // ✅ 회원가입 처리 함수
  const handleSignup = () => {
    axios
      .post("http://10.5.5.5:80/auth/signup", signup, {
        headers: { "Content-Type": "application/json" },
      })
      .then(() => {
        setSignupMode(false); // 성공 후 로그인 화면으로 전환
        navigate("/auth/login");
      })
      .catch(() => {
        console.error("회원가입 요청 에러");
      });
  };

  return (
    <div className="container">
      <h2>로그인 / 회원가입</h2>

      {!signupMode ? (
        <LoginForm
          login={login}
          onChange={handleLoginChange}
          onLogin={handleLogin}
          switchToSignup={() => setSignupMode(true)}
        />
      ) : (
        <SingnupForm
          signup={signup}
          onChange={handleSignupChange}
          onSignup={handleSignup}
          switchToLogin={() => setSignupMode(false)}
        />
      )}
    </div>
  );
}

// 최상위 App
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/auth/login" element={<LoginSignup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
