import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../services/course.service";

const CoursePostComponent = ({ currentUser, setCurrentUser }) => {
  let [msg, setMsg] = useState("");
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [price, setPrice] = useState("");
  const navigate = useNavigate();
  const handleToLogin = () => {
    navigate("/login");
  };
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  const handlePrice = (e) => {
    setPrice(e.target.value);
  };

  const handlePost = () => {
    CourseService.post(title, description, price)
      .then((data) => {
        console.log(data);
        console.log("提交成功");
        alert("成功新增課程，將幫您導向課程頁面");
        navigate("/course");
      })
      .catch((e) => {
        console.log(e.response.data);
        setMsg(e.response.data);
      });
  };

  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>
          <h1>發布課程之前要先登錄</h1>
          <br />
          <button className="btn btn-primary" onClick={handleToLogin}>
            返回登入頁面
          </button>
        </div>
      )}

      {currentUser && currentUser.user.role == "student" && (
        <div>
          <h1>只有講師才能新增課程</h1>
          <br />
          <p>如您已是講師請登入講師帳號</p>
        </div>
      )}

      {currentUser && currentUser.user.role == "teacher" && (
        <div>
          {msg && <div className="alert alert-warning">{msg}</div>}
          <div className="form-group" style={{ fontSize: "1.25rem" }}>
            <label for="exampleforTitle">課程標題：</label>
            <input
              name="title"
              type="text"
              className="form-control"
              id="exampleforTitle"
              onChange={handleTitle}
            />
            <br />
            <label for="exampleforContent">內容：</label>
            <textarea
              cols="20"
              rows="5"
              className="form-control"
              id="exampleforContent"
              aria-describedby="emailHelp"
              name="content"
              onChange={handleDescription}
            />
            <br />
            <label for="exampleforPrice">價格： </label>
            <br />
            <label>( 價格僅能訂於$10-$9999 )</label>
            <input
              name="price"
              type="number"
              className="form-control"
              id="exampleforPrice"
              onChange={handlePrice}
            />
            <br />
            <button className="btn btn-primary" onClick={handlePost}>
              交出表單
            </button>
            <br />
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursePostComponent;
