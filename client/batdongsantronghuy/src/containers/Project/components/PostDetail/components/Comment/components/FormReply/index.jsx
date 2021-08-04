import { Controller, setValue } from 'react-hook-form';
import postAPI from '../../../../../../../../api/postAPI';
import Tooltip from '@material-ui/core/Tooltip';
import { useDispatch, useSelector } from 'react-redux';
import { showLogin } from '../../../../../../../Auth/userSlice';
import { LoginModal } from '../../../../../../../../components/Modals/LoginModal';
import useDialog from '../../../../../../../../components/hooks/useDialog';

export const FormReply = ({ open, form, parentId, postId, onSubmit }) => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.user.current.user);
  const isLoggedIn = loggedInUser?.id;

  const mustLogin = useSelector((state) => state.user.mustLogin);
  const { mode, navigate } = useDialog();
  const handleSubmit = async (values) => {
    if (!values.comment) {
      return;
    }
    if (!isLoggedIn) {
      const action = showLogin();
      dispatch(action);
    }

    const response = await postAPI.commentPost({
      content: values.comment,
      postId: postId,
      parentId: values.parentId || 0,
    });

    if (response?.succeeded) {
      onSubmit(response);
      form.reset();
    } else {
      return;
    }
  };
  return (
    open && (
      <>
        <div className="reply__form">
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="d-flex form-reply">
              <Controller
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <textarea
                    {...field}
                    placeholder="Nhập bình luận..."
                    rows="2"
                  />
                )}
              />
              <Tooltip title="Gửi">
                <button
                  type="submit"
                  className="send-reply"
                  value="Gửi"
                  onClick={() => {
                    form.setValue('parentId', parentId);
                  }}
                >
                  <i className="fa fa-paper-plane" aria-hidden="true"></i>
                </button>
              </Tooltip>
            </div>
          </form>
        </div>
        <LoginModal
          open={mustLogin.isRequired}
          navigate={navigate}
          message={mustLogin.message}
          mode={mode}
        />
      </>
    )
  );
};
