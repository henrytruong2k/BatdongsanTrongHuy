import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validateChangePassword } from '../../../../../../ults/validateChangePassword';
import userAPI from '../../../../../../api/userAPI';
import clsx from 'clsx';

const ChangePassword = () => {
  const schema = validateChangePassword;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      currentPassword: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(schema),
  });

  const [result, setResult] = React.useState({});
  const onSubmit = async (data) => {
    const response = await userAPI.changePassword(data);
    if (response.succeeded) {
      setResult({
        succeeded: true,
        message: 'Đổi thành công',
      });
      reset();
    } else {
      setResult({
        succeeded: false,
        message: response?.message,
      });
    }
  };
  return (
    <>
      <div className="box__header box__header--textLeft">
        <h3>Đổi mật khẩu</h3>
      </div>
      <div className="mt-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <table className="tblInfo">
            <tbody>
              <tr>
                <td style={{ width: '130px' }}>
                  <label>
                    Mật khẩu hiện tại <span style={{ color: 'red' }}>(*)</span>
                  </label>
                </td>
                <td>
                  <input
                    type="password"
                    className="keycode"
                    {...register('currentPassword')}
                  />
                  {errors.currentPassword && (
                    <p className="err-msg">{errors.currentPassword.message}</p>
                  )}
                </td>
              </tr>
              <tr>
                <td style={{ width: '130px' }}>
                  <label>
                    Mật khẩu mới <span style={{ color: 'red' }}>(*)</span>
                  </label>
                </td>
                <td>
                  <input
                    type="password"
                    className="keycode"
                    {...register('password')}
                  />
                  {errors.password && (
                    <p className="err-msg">{errors.password.message}</p>
                  )}
                </td>
              </tr>
              <tr>
                <td style={{ width: '130px' }}>
                  <label>
                    Mật khẩu xác nhận <span style={{ color: 'red' }}>(*)</span>
                  </label>
                </td>
                <td>
                  <input
                    type="password"
                    className="keycode"
                    {...register('confirmPassword')}
                  />
                  {errors.confirmPassword && (
                    <p className="err-msg">{errors.confirmPassword.message}</p>
                  )}
                </td>
              </tr>

              <tr>
                <td></td>
                <td>
                  {result && (
                    <h6
                      className={clsx(
                        result.succeeded ? 'text-success' : 'text-danger'
                      )}
                    >
                      {result.message}
                    </h6>
                  )}
                  <input type="submit" className="saveBtn" value="Lưu" />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
