import React, { useEffect } from "react";

const HomeComponent = () => {
  const courseInfo = () => {
    alert(
      "目前可註冊的課程有\n測試用的衝浪課、測試用的烹飪課、來了!第三堂課\n以上"
    );
  };
  const courseTeach = () => {
    alert(
      "這是一個MERN專案\n使用者可以註冊本地帳戶並登入系統\n作為講師的你可以自由開設喜歡的課程\n作為學生的你可以搜尋有興趣的課程並註冊"
    );
  };

  const handleInfo = () => {
    courseInfo();
  };
  const handleTeach = () => {
    courseTeach();
  };

  return (
    <main>
      <div className="container py-4">
        <div className="p-5 mb-4 bg-light rounded-3">
          <div className="container-fluid py-5">
            <h1 className="display-5 fw-bold">學習系統</h1>
            <p className="col-md-8 fs-4">
              本系統使用 React.js 作為前端框架，Node.js、MongoDB
              作為後端服務器。這種項目稱為 MERN
              項目，它是創建現代網站的最流行的方式之一。
            </p>
            <div style={{ disaplay: "flex", flexWrap: "wrap" }}>
              <button
                className="btn btn-primary btn-lg"
                type="button"
                style={{ margin: "15px" }}
                onClick={handleTeach}
              >
                看看它怎麼運作。
              </button>
              <button
                className="btn btn-primary btn-lg"
                type="button"
                onClick={handleInfo}
              >
                查看目前擁有的課程
              </button>
            </div>
          </div>
        </div>

        <div className="row align-items-md-stretch">
          <div className="col-md-6">
            <div className="h-100 p-5 text-white bg-dark rounded-3">
              <h2>作為一個學生</h2>
              <p>
                學生可以註冊他們喜歡的課程。本網站僅供練習之用，請勿提供任何個人資料，例如信用卡號碼。
              </p>
              <button className="btn btn-outline-light" type="button">
                登錄會員、或者註冊一個帳號
              </button>
            </div>
          </div>
          <div className="col-md-6">
            <div className="h-100 p-5 bg-light border rounded-3">
              <h2>作為一個導師</h2>
              <p>
                您可以通過註冊成為一名講師，並開始製作在線課程。本網站僅供練習之用，請勿提供任何個人資料，例如信用卡號碼。
              </p>
              <button className="btn btn-outline-secondary" type="button">
                今天開始開設課程
              </button>
            </div>
          </div>
        </div>

        <footer className="pt-3 mt-4 text-muted border-top">
          &copy; 2023 Benson Wu
        </footer>
      </div>
    </main>
  );
};

export default HomeComponent;
