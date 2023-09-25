import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const LoginComponent = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [msg, setMsg] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleToLogin = async () => {
    try {
      let response = await AuthService.login(email, password);
      // console.log(response);  response.data =>有token&user
      localStorage.setItem("mainkey", JSON.stringify(response.data));
      alert("登入成功，將導向個人頁面");
      setCurrentUser(AuthService.getCurrentUser());
      navigate("/profile");
    } catch (e) {
      console.log(e);
      setMsg(e.response.data);
    }
  };

  return (
    <div>
      <div style={{ padding: "3rem" }} className="col-md-12">
        {msg && <div className="alert alert-danger">{msg}</div>}
        <div>
          <div className="form-group">
            <label htmlFor="email">電子信箱:</label>
            <input
              onChange={handleEmail}
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
            />
          </div>
          <br />
          <div className="form-group">
            <button
              onClick={handleToLogin}
              className="btn btn-primary btn-block"
            >
              登入系統
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
