import React from 'react';
import './style.scss';

const PopUpChat = () => {
  const handleOpenForm = () => {
    document.getElementById('myForm').style.display = 'block';
  };
  const handleCloseForm = () => {
    document.getElementById('myForm').style.display = 'none';
  };
  return (
    <>
      <button className="open-button" onClick={handleOpenForm}>
        Nhắn tin với chúng tôi
      </button>
      <div className="chat-popup" id="myForm">
        <form className="form-container">
          <h1>Chat với Batdongsan</h1>
          <p className="btn-cancel" onClick={handleCloseForm}>
            __
          </p>
          <div className="form-input">
            <div>
              <p>
                Cảm ơn bạn đã ghé thăm BatdongsanTrongHuy! Hiện tại bộ phận Chăm
                sóc khách hàng đang không trực tuyến. Vui lòng để lại lời nhắn,
                chúng tôi sẽ liên hệ lại với bạn trong thời gian sớm nhất.
              </p>
              <label>
                Tên:
                <span> *</span>
              </label>
              <input type="text" id="name" required />
              <label>
                Email:
                <span> *</span>
              </label>
              <input type="text" id="email" required />
              <label>
                Lời nhắn:
                <span> *</span>
              </label>
              <textarea id="msg" required></textarea>
              <label>SĐT:</label>
              <input type="text" id="phone_number" required />
              <button type="submit" className="btn">
                Để lại lời nhắn
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default PopUpChat;
