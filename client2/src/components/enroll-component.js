import React, { useState } from "react";
import CourseService from "../services/course.service";
import { useNavigate } from "react-router-dom";

const EnrollComponent = ({ currentUser, setCurrentUser }) => {
  let [input, setInput] = useState("");
  let [dataCup, setDataCup] = useState("");
  let [msg, setMsg] = useState("");
  let [searchResult, setSearchResult] = useState(null);
  const navigate = useNavigate();
  const handleToLogin = () => {
    navigate("/login");
  };
  const changeInput = (e) => {
    setInput(e.target.value);
  };

  const handleSearch = () => {
    CourseService.searchByName(input)
      .then((data) => {
        console.log(data.data);
        setSearchResult(data.data);
        setMsg("");
        if (data.data.length < 1) {
          setDataCup("not found");
        } else {
          setDataCup("");
        }
      })
      .catch((e) => {
        if (e) {
          setMsg(e.response.data.name);
          setDataCup("");
        }
      });
  };

  //因為a tag有設定id的值，所以當按下時，e.target.id可以得到"這堂課"的id
  const handleEnroll = (e) => {
    // console.log(e.target.id);
    CourseService.enroll(e.target.id)
      .then(() => {
        alert("註冊成功，將您導回課程頁面");
        navigate("/course");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div style={{ padding: "3rem" }}>
      {msg == "CastError" && (
        <div className="alert alert-danger">請輸入課程全名進行搜尋</div>
      )}
      {dataCup !== "" && (
        <div className="alert alert-danger">找不到課程，請重新搜尋</div>
      )}

      {/* 找不到課程 */}
      {}

      {/* 兩個驗證機制 */}
      {!currentUser && (
        <div>
          <h1>註冊課程之前要先登錄</h1>
          <br />
          <button className="btn btn-primary" onClick={handleToLogin}>
            返回登入頁面
          </button>
        </div>
      )}
      {currentUser && currentUser.user.role == "teacher" && (
        <div>
          <h1>只有學生才能新增課程</h1>
        </div>
      )}

      {currentUser && currentUser.user.role == "student" && (
        <div className="search input-group mb-3">
          <input
            type="text"
            className="form-control"
            onChange={changeInput}
            placeholder="請輸入課程全名進行查詢"
          ></input>
          <button className="btn btn-primary" onClick={handleSearch}>
            搜尋課程
          </button>
        </div>
      )}
      {searchResult && searchResult.length != 0 && (
        <div>
          <p>這些課程是從API返回的數據</p>
          {searchResult.map((course) => (
            <div className="card" style={{ width: "18rem" }} key={course._id}>
              <div className="card-body">
                <h5 className="card-title">
                  課程名稱：
                  <strong style={{ color: "#00AA00" }}>{course.title}</strong>
                </h5>
                <p className="card-text" style={{ margin: "0.5rem 0rem" }}>
                  <span style={{ color: "#0000FF" }}>{course.description}</span>
                </p>
                <p style={{ margin: "0.5rem 0rem" }}>
                  學生人數：{course.student.length}
                </p>
                <p style={{ margin: "0.5rem 0rem" }}>
                  課程價格： $ {course.price}
                </p>
                <p style={{ color: "coral", margin: "0.5rem 0rem" }}>
                  講師資訊：{course.teacher.username}
                </p>

                <a
                  href="#"
                  className="card-text btn btn-primary"
                  id={course._id}
                  onClick={handleEnroll}
                >
                  註冊課程
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnrollComponent;
