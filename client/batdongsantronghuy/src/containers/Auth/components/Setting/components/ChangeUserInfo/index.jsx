import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import './style.scss';

const ChangeUserInfo = () => {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log('form: ', data);

  const userInfo = useSelector((state) => state.user.current.user);
  console.log('userInfo: ', userInfo);
  return (
    <>
      <div className="box__header box__header--textLeft">
        <h3>Thay đổi thông tin cá nhân</h3>
      </div>
      <div className="mt-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <table className="tblInfo">
            <tr>
              <td style={{ width: '130px' }}>
                <label>
                  Họ và tên <span style={{ color: 'red' }}>(*)</span>
                </label>
              </td>
              <td>
                <input
                  className="keycode"
                  defaultValue={userInfo.fullName}
                  {...register('FullName', { required: true })}
                />
                {errors.FullName && (
                  <p className="err-msg">Vui lòng nhập họ tên.</p>
                )}
              </td>
            </tr>
            <tr>
              <td style={{ width: '130px' }}>
                <label>
                  Email <span style={{ color: 'red' }}>(*)</span>
                </label>
              </td>
              <td>
                <input
                  className="keycode"
                  defaultValue={userInfo.email}
                  disabled
                />
              </td>
            </tr>
            <tr>
              <td style={{ width: '130px' }}>
                <label>
                  Địa chỉ <span style={{ color: 'red' }}>(*)</span>
                </label>
              </td>
              <td>
                <input
                  className="keycode"
                  defaultValue={userInfo.address}
                  {...register('Address', { required: true })}
                />
                {errors.Address && (
                  <p className="err-msg">Vui lòng nhập địa chỉ.</p>
                )}
              </td>
            </tr>
            <tr>
              <td style={{ width: '130px' }}>
                <label>
                  Số điện thoại <span style={{ color: 'red' }}>(*)</span>
                </label>
              </td>
              <td>
                <input
                  className="keycode"
                  defaultValue={userInfo.phoneNumber}
                  {...register('PhoneNumber', { required: true })}
                />
                {errors.PhoneNumber && (
                  <p className="err-msg">Vui lòng nhập số điện thoại.</p>
                )}
              </td>
            </tr>
            <tr>
              <td style={{ width: '130px' }}>
                <label>Ảnh đại diện</label>
              </td>
              <td>
                <label htmlFor="upload-photo">
                  <input
                    className="d-none keycode"
                    type="file"
                    id="upload-photo"
                  />
                  <div className="fileBtn">Chọn file</div>
                </label>
              </td>
            </tr>
            <tr>
              <td>
                <input type="submit" className="saveBtn" value="Lưu" />
              </td>
            </tr>
          </table>
        </form>
      </div>
    </>
  );
};

export default ChangeUserInfo;
