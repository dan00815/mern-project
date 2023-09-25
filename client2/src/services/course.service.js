import axios from "axios";
const API = "http://localhost:8080/api/courses";

//Course是要受到jwt保護的Route，所以都要設定token
class CourseService {
  getCourse(_id) {
    let token;
    if (localStorage.getItem("mainkey")) {
      token = JSON.parse(localStorage.getItem("mainkey")).token;
    } else {
      token = "";
    }
    return axios.get(API + "/teacher/" + _id, {
      headers: { Authorization: token },
    });
  }

  getStudentCourse(_id) {
    let token;
    if (localStorage.getItem("mainkey")) {
      token = JSON.parse(localStorage.getItem("mainkey")).token;
    } else {
      token = "";
    }

    return axios.get(API + "/student/" + _id, {
      headers: { Authorization: token },
    });
  }

  post(title, description, price) {
    let token;
    if (localStorage.getItem("mainkey")) {
      token = JSON.parse(localStorage.getItem("mainkey")).token;
    } else {
      token = "";
    }

    return axios.post(
      API,
      { title, description, price }, //title, description, price放在req.body成為提交的參數
      { headers: { Authorization: token } }
    );
  }

  searchByName(name) {
    let token;
    if (localStorage.getItem("mainkey")) {
      token = JSON.parse(localStorage.getItem("mainkey")).token;
    } else {
      token = "";
    }

    return axios.get(API + "/findByName/" + name, {
      headers: { Authorization: token },
    });
  }

  enroll(_id) {
    let token;
    if (localStorage.getItem("mainkey")) {
      token = JSON.parse(localStorage.getItem("mainkey")).token;
    } else {
      token = "";
    }

    return axios.post(
      API + "/enroll/" + _id,
      {},
      {
        headers: { Authorization: token },
      }
    );
  }

  enrollOut(_id) {
    let token;
    if (localStorage.getItem("mainkey")) {
      token = JSON.parse(localStorage.getItem("mainkey")).token;
    } else {
      token = "";
    }

    return axios.post(
      API + "/enrollOut/" + _id,
      {},
      { headers: { Authorization: token } }
    );
  }
}

export default new CourseService();
