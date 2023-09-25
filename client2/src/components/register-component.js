import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const RegisterComponent = () => {
  const navigate = useNavigate();
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [role, setRole] = useState("");
  let [msg, setMsg] = useState("");

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleRole = (e) => {
    setRole(e.target.value);
  };

  const handleToRegister = async () => {
    try {
      await AuthService.register(username, email, password, role);
      console.log("有註冊到");
      alert("恭喜註冊成功，將您導向登入頁面");
      navigate("/login");
    } catch (e) {
      setMsg(e.response.data);
    }
  };

  return (
    <div style={{ padding: "3rem" }} className="col-md-12">
      {msg && <div className="alert alert-danger">{msg}</div>}
      <div>
        <div>
          <label>用戶名稱:</label>
          <input
            onChange={handleUsername}
            type="text"
            className="form-control"
            name="username"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="email">電子信箱:</label>
          <input
            onChange={handleEmail}
            htmlFor="email"
            type="email"
            className="form-control"
            name="email"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password">密碼:</label>
          <input
            onChange={handlePassword}
            type="password"
            className="form-control"
            name="password"
            placeholder="長度至少超過6個英文或數字"
          />
        </div>
        <br />
        <div className="form-group">
          <label>身份：</label>
          <input
            onChange={handleRole}
            type="text"
            className="form-control"
            placeholder="只能填入student或是teacher這兩個選項其一"
            name="role"
          />
        </div>
        <br />
        <button onClick={handleToRegister} className="btn btn-primary">
          註冊會員
        </button>
      </div>
    </div>
  );
};

export default RegisterComponent;
