import { Backdrop } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import InfoIcon from '@material-ui/icons/Info';
import moment from 'moment';
import React from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import postAPI from '../../../../../../api/postAPI';
import { POSTTYPE } from '../../../../../../constants/postType';
import Pagination from './components/PaginationComponent';
import './style.scss';

const useStyles = makeStyles(() =>
  createStyles({
    loading: {
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    backdrop: {
      zIndex: '1000',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      '& div': {
        zIndex: '1000',
      },
    },
  })
);

const ManagePost = ({ list, setList, loading, onDelete }) => {
  const [loadingToDelete, setLoadingToDelete] = React.useState(false);
  const history = useHistory();
  const classes = useStyles();

  const showStatusMethod = (status) => {
    let message = '';
    switch (status) {
      case POSTTYPE.POSTED:
        message = 'Đã đăng.';
        break;
      case POSTTYPE.WAITING:
        message = 'Chờ duyệt.';
        break;
      case POSTTYPE.NEEDTOPAY:
        message = 'Chưa thanh toán.';
        break;
      default:
        message = 'Không tìm thấy.';
        break;
    }
    return message;
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: `Bạn chắc chắn muốn xóa #${id} ?`,
      text: 'Bạn sẽ không thể khôi phục dữ liệu này!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        (async () => {
          try {
            setLoadingToDelete(true);
            const response = await postAPI.deletePostByUser(id);

            if (response.succeeded) {
              setLoadingToDelete(false);
              Swal.fire('Đã xóa!', 'Đã xóa thành công.', 'success');
              if (!onDelete) return;
              onDelete(id);
            }
          } catch (err) {
            console.log('Failed to delete post: ', err);
          }
          setLoadingToDelete(false);
        })();
      }
    });
  };
  const [search, setSearch] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalItems, setTotalItems] = React.useState(0);
  const ITEMS_PER_PAGE = 3;

  const postList = React.useMemo(() => {
    let computedList = list;
    if (search) {
      computedList = computedList.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    setTotalItems(computedList.length);
    return computedList.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [search, list, currentPage]);

  return (
    <>
      <div className="box__header box__header--textLeft">
        <h3>Quản lý bài viết</h3>
      </div>

      {loadingToDelete && (
        <div className={classes.backdrop}>
          <Backdrop open={loadingToDelete}>
            <CircularProgress />
          </Backdrop>
        </div>
      )}
      {loading ? (
        <div className={classes.loading}>
          <CircularProgress />
        </div>
      ) : (
        <>
          <input
            type="text"
            className="form-search form-control"
            placeholder="Tìm kiếm theo tiêu đề"
            aria-label="Search"
            aria-describedby="basic-addon1"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="table-manage">
            <table>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Mã tin</th>
                  <th>Ảnh</th>
                  <th>Tiêu đề</th>
                  <th>Ngày bắt đầu</th>
                  <th>Ngày hết hạn</th>
                  <th>Trạng thái</th>
                  <th>Công cụ</th>
                </tr>
              </thead>
              <tbody>
                {postList.length === 0 ? (
                  <tr>
                    <td colSpan="8">Không tìm thấy bài đăng phù hợp.</td>
                  </tr>
                ) : (
                  postList.map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <td>{++index}</td>
                        <td>
                          <b>#{item.id}</b>
                        </td>
                        <td>
                          <img
                            src={item?.images[0]?.url}
                            alt={item.title}
                            width="50"
                            height="50"
                          />
                        </td>
                        <td>
                          <span>{item.title}</span>
                        </td>
                        <td>{moment(item.startDate).format('DD/MM/YYYY')}</td>
                        <td>{moment(item.endDate).format('DD/MM/YYYY')}</td>
                        <td>
                          {showStatusMethod(item.status)}
                          {item.status === POSTTYPE.NEEDTOPAY && (
                            <a
                              href={`/thanh-toan/${item.id}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              Thanh toán ngay!
                            </a>
                          )}
                        </td>
                        <td>
                          <div className="tool-items d-flex">
                            <EditIcon
                              className="mx-1"
                              onClick={() => {
                                history.push(
                                  `/bai-dang/sua-bai-viet/${item.id}`
                                );
                                window.location.reload();
                              }}
                            />

                            <InfoIcon
                              className="mx-1"
                              onClick={() => {
                                history.push(`/bai-dang/${item.id}`);
                                window.location.reload();
                              }}
                            />

                            <DeleteIcon
                              className="mx-1"
                              onClick={() => handleDelete(item.id)}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          <div className="table-pagination">
            <Pagination
              total={totalItems}
              itemsPerPage={ITEMS_PER_PAGE}
              currentPage={currentPage}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </>
      )}
    </>
  );
};

export default ManagePost;
