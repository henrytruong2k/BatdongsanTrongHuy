import moment from 'moment';
import React from 'react';
import './style.scss';

function Management({ list, createPost }) {
  const posted = list.filter((item) => item === 1);
  const waiting = list.filter((item) => item === 2);
  const deleted = list.filter((item) => item === -1);

  const display = list.filter((item) => item.status !== -1);
  return (
    <>
      <div className="form">
        <h2>Quản lý bài đăng</h2>
        {list.length > 0 ? (
          <div className="list">
            {display.map((item) => {
              const date = moment(item.address.createAt).format('D');
              return (
                <div className="list__item" key={item.id}>
                  <img
                    alt={item.title}
                    src={item?.images[0]?.url}
                    width="50"
                    height="50"
                  />
                  <div className="content">
                    <h5>{item.title}</h5>
                    <p>
                      Ngày đăng: {moment(item.address.createAt).calendar('L')}
                    </p>
                    <p>
                      Trạng thái: &nbsp;
                      {item.status === 1 ? 'Đã đăng' : 'Đang chờ phê duyệt'}
                    </p>
                    <p>
                      {item.status === 2 ? <a>Liên hệ ngay với admin</a> : ''}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <>
            <h3>Bạn chưa có bài đăng nào</h3>
            <button onClick={createPost} className="btn-create">
              Tạo bài viết mới
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default Management;
