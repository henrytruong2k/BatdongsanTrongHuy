import { yupResolver } from '@hookform/resolvers/yup';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import userAPI from '../../../../../../api/userAPI';
import { validationUpdateInfo } from '../../../../../../ults/validationUpdateInfo';
import './style.scss';

const ChangeUserInfo = () => {
  const schema = validationUpdateInfo;

  const userInfo = useSelector((state) => state.user.current.user);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty, isValid },
  } = useForm({
    defaultValues: {
      FullName: userInfo.fullName,
      Address: userInfo.address,
      PhoneNumber: userInfo.phoneNumber,
      ImageFile: null,
    },
    resolver: yupResolver(schema),
  });

  const [avatar, setAvatar] = useState(null);
  const handleChangeImage = (e) => {
    setAvatar(e.target.files[0]);
    setValue('ImageFile', e.target.files, { shouldDirty: true });
  };

  const onSubmit = async (data) => {
    const response = await userAPI.updateUser({
      ...data,
      ImageFile: data.ImageFile[0],
      Id: userInfo.id,
    });

    if (response) {
      const { fullName, address, phoneNumber, image } = response.data;
      localStorage.setItem(
        'user',
        JSON.stringify({
          ...userInfo,
          fullName,
          address,
          phoneNumber,
          image,
        })
      );
      window.location.reload();
    }
  };

  return (
    <>
      <div className="box__header box__header--textLeft">
        <h3>Thay đổi thông tin cá nhân</h3>
      </div>
      <div className="mt-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <table className="tblInfo">
            <tbody>
              <tr>
                <td style={{ width: '130px' }}>
                  <label>
                    Họ và tên <span style={{ color: 'red' }}>(*)</span>
                  </label>
                </td>
                <td>
                  <input className="keycode" {...register('FullName')} />
                  {errors.FullName && (
                    <p className="err-msg">{errors.FullName.message}</p>
                  )}
                </td>
              </tr>
              <tr>
                <td style={{ width: '130px' }}>
                  <label>
                    Địa chỉ <span style={{ color: 'red' }}>(*)</span>
                  </label>
                </td>
                <td>
                  <input className="keycode" {...register('Address')} />
                  {errors.Address && (
                    <p className="err-msg">{errors.Address.message}</p>
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
                  <input className="keycode" {...register('PhoneNumber')} />
                  {errors.PhoneNumber && (
                    <p className="err-msg">{errors.PhoneNumber.message}</p>
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
                      {...register('ImageFile')}
                      onChange={handleChangeImage}
                    />
                    <div className="fileBtn">Chọn file</div>
                  </label>
                </td>
              </tr>
              {avatar && (
                <tr>
                  <td style={{ width: '130px' }}></td>
                  <td>
                    <img
                      className="avatar-image"
                      src={URL.createObjectURL(avatar)}
                      alt="Your avatar"
                    />
                  </td>
                </tr>
              )}
              <tr>
                <td>
                  <input
                    disabled={!isDirty || !isValid}
                    type="submit"
                    className="saveBtn"
                    value="Lưu"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </>
  );
};

export default ChangeUserInfo;
