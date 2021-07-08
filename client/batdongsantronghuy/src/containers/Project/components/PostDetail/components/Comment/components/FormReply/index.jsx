import { Controller, setValue } from 'react-hook-form';
import postAPI from '../../../../../../../../api/postAPI';
import Tooltip from '@material-ui/core/Tooltip';

export const FormReply = ({ open, form, parentId, postId, onSubmit }) => {
  const handleSubmit = async (values) => {
    if (!values.comment) {
      return;
    }

    const response = await postAPI.commentPost({
      content: values.comment,
      postId: postId,
      parentId: values.parentId || 0,
    });

    if (response) {
      onSubmit(response);
      form.reset();
    }
  };
  return (
    open && (
      <div className="reply__form">
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="d-flex form-reply">
            <Controller
              control={form.control}
              name="comment"
              render={({ field }) => (
                <textarea {...field} placeholder="Nhập bình luận..." rows="2" />
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
    )
  );
};
