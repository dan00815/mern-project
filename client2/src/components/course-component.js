import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../services/course.service";

const CourseComponent = ({ currentUser, setCurrentUser }) => {
  let [courseData, setCourseData] = useState(null);
  const navigate = useNavigate();
  const handleToLogin = () => {
    navigate("/login");
  };
  //退選課程
  const handleToOut = (e) => {
    CourseService.enrollOut(e.target.id)
      .then(() => {
        alert("退選成功，請重整課程頁面");
        navigate("/profile");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    let _id;
    if (currentUser) {
      _id = currentUser.user._id;
      if (currentUser.user.role == "teacher") {
        CourseService.getCourse(_id)
          .then((data) => {
            setCourseData(data.data);
          })
          .catch((e) => {
            console.log(e);
          });
      } else if (currentUser.user.role == "student") {
        CourseService.getStudentCourse(_id)
          .then((data) => {
            setCourseData(data.data);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
  }, []);

  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div style={{ padding: "3rem" }}>
          <h1>必須先登入才能查看課程</h1>
          <br />
          <button className="btn btn-primary" onClick={handleToLogin}>
            返回登入頁面
          </button>
        </div>
      )}

      {currentUser && currentUser.user.role == "teacher" && (
        <div>
          <h1>講師課程頁面</h1>
        </div>
      )}

      {currentUser && currentUser.user.role == "student" && (
        <div>
          <h1>學生課程頁面</h1>
          <h5></h5>
        </div>
      )}
      {currentUser && currentUser.user.role == "student" && (
        <div>以下為您註冊的課程</div>
      )}
      {currentUser && currentUser.user.role == "teacher" && (
        <div>以下為您擁有的課程</div>
      )}

      {currentUser && courseData && courseData.length != 0 && (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {courseData.map((course) => (
            <div className="card" style={{ width: "18rem", margin: "1rem" }}>
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
                {currentUser.user.role == "student" && (
                  <a
                    href="#"
                    className="card-text btn btn-primary"
                    id={course._id}
                    onClick={handleToOut}
                  >
                    取消課程
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseComponent;
