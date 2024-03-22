import React, { useState, useEffect } from 'react';

export default function Testemail() {
  const [redirectMessage, setRedirectMessage] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      // Thực hiện chuyển hướng sau 10 giây
      window.location.href = 'https://example.com'; // Thay đổi URL cần chuyển đến
    }, 10000); // 10 giây

    // Xóa bộ đếm ngược nếu component bị unmounted trước khi hết thời gian
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setRedirectMessage("Bạn sẽ được chuyển hướng sau 10 giây.");
  }, []);

  return (
    <div style={{ textAlign: 'center', color: 'red' }}>
      <p>Đã xác thực thành công</p>
      <p>{redirectMessage}</p>
    </div>
  );
}
