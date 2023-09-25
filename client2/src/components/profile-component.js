import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../services/course.service";

const ProfileComponent = ({ currentUser, setCurrentUser }) => {
  let [courseCount, setCourseCount] = useState(0);
  const navigate = useNavigate();
  const handleToLogin = () => {
    navigate("/login");
  };

  useEffect(() => {
    let _id;
    if (currentUser) {
      _id = currentUser.user._id;
    }
    CourseService.getStudentCourse(_id)
      .then((data) => {
        setCourseCount(data.data.length);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>
          <h1>在獲取您的個人資料前，您必須先登錄！</h1>
          <br />
          <button className="btn btn-primary" onClick={handleToLogin}>
            返回登入頁面
          </button>
        </div>
      )}

      {currentUser && (
        <div>
          <h2>以下是您的個人檔案：</h2>
          <table className="table">
            <tbody>
              <tr>
                <td>
                  <strong>
                    姓名：
                    <strong style={{ color: "coral" }}>
                      {currentUser.user.username}
                    </strong>
                  </strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>您的用戶ＩＤ：{currentUser.user._id}</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>您註冊的電子信箱：{currentUser.user.email}</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>
                    身份：
                    <strong style={{ color: "coral" }}>
                      {currentUser.user.role}
                    </strong>
                  </strong>
                </td>
              </tr>
              {currentUser.user.role == "student" && (
                <tr>
                  <td>
                    <strong>註冊課程數：{courseCount}</strong>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProfileComponent;
