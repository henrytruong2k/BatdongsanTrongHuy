import moment from 'moment';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import styled from 'styled-components';
import useManagePost from './hooks/useManagePost';
import './style.scss';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/Info';
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from 'react-router-dom';
import { router } from '../../constants/router';
import Loading from './components/Loading';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import postAPI from '../../api/postAPI';

const Wrapper = styled.div`
  padding-top: 60px;
`;

function ManagePost(props) {
  const { postList, loading, setPostList } = useManagePost();

  const showStatusMethod = (status) => {
    let message = '';
    switch (status) {
      case 1:
        message = 'Đã đăng';
        break;
      case 2:
        message = 'Chờ duyệt';
        break;
      case 3:
        message = 'Chưa thanh toán';
        break;
      default:
        message = 'Không tìm thấy';
        break;
    }
    return message;
  };
  let history = useHistory();
  const handleAddPostButtonClick = () => {
    history.push(router.TAOBAIVIET);
  };
  const handleDelete = (id) => () => {
    Swal.fire({
      title: `Bạn chắc chắn muốn xóa ${id} ?`,
      text: 'Bạn sẽ không thể khôi phục dữ liệu này!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa!',
      cancelButtonText: 'Hủy!',
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          Swal.fire('Đã xóa!', 'Đã xóa thành công.', 'success');
          const response = postAPI.deletePostByUser(id);
          const postListAfterDeleted = postList.filter(
            (item) => item.id !== id
          );
          setPostList(postListAfterDeleted);
        } catch (err) {
          console.log(err);
        }
      }
    });
  };
  return (
    <Wrapper>
      <Container>
        <Row>
          <Col className="col-12 mt-4">
            <div className="d-flex justify-content-between">
              <h2>Quản lý bài viết</h2>
              <AddPostButton onClick={handleAddPostButtonClick}>
                <p>Đăng bài</p>
              </AddPostButton>
            </div>
            <div className="post__header d-flex mt-5">
              <p className="id">STT</p>
              <p className="image">Hình ảnh</p>
              <p className="title">Tiêu đề</p>
              <p className="price ml-3">Giá (VND)</p>
              <p className="time">Ngày đăng</p>
              <p className="status ml-3">Trạng thái</p>
              <p className="tools px-3">Công cụ</p>
            </div>
          </Col>
          {loading ? (
            <Loading />
          ) : postList?.length > 0 ? (
            postList.map((item, index) => {
              return (
                <Col className="col-12">
                  <div className="post__item d-flex align-items-center mt-4">
                    <div className="id">
                      <p>{++index}</p>
                    </div>
                    <div className="image">
                      <img
                        src={item?.images[0]?.url}
                        alt={item.title}
                        width="80"
                        height="80"
                      />
                    </div>

                    <div className="title">
                      <p className="text-uppercase">{item.title}</p>
                    </div>
                    <div className="price ml-3">
                      <p>
                        {Intl.NumberFormat('vi-VN', {
                          style: 'currency',
                          currency: 'VND',
                        }).format(item.price)}
                      </p>
                    </div>

                    <div className="time">
                      <p>{moment(item.createAt).format('L')}</p>
                      <p>({moment(item.createAt, 'YYYYMMDD').fromNow()})</p>
                    </div>
                    <div className="status ml-3">
                      <p>{showStatusMethod(item.status)}</p>
                    </div>
                    <div className="tools d-flex">
                      <Link to={`/bai-dang/sua-bai-viet/${item.id}`}>
                        <EditIcon className="mx-1" />
                      </Link>
                      <Link to={`/bai-dang/${item.id}`}>
                        <InfoIcon className="mx-1" />
                      </Link>
                      <div className="delete" onClick={handleDelete(item.id)}>
                        <DeleteIcon className="mx-1" />
                      </div>
                    </div>
                  </div>
                </Col>
              );
            })
          ) : (
            <NoPost />
          )}
        </Row>
      </Container>
    </Wrapper>
  );
}

export default ManagePost;

const AddPostButton = styled.button`
  padding: 12px 14px;
  background-color: #2cbdb8;
  border-radius: 5px;
  border: 1px solid #000;
  display: flex;
  align-items: center;

  p {
    margin-bottom: 0;
  }

  &:hover {
    background-color: #fff;
    border: 1px solid #2cbdb8;
    color: #2cbdb8;
  }
`;
const NoPost = () => {
  return (
    <Col className="col-12">
      <p className="text-center mt-5">Không còn bài viết.</p>
    </Col>
  );
};
