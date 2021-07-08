import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import { useSelector } from 'react-redux';
import postAPI from '../../../../../../../../../../api/postAPI';
import { reportOptions } from '../../../../../../../../../../data/data';
import Swal from 'sweetalert2';
const useStyles = makeStyles((theme) => ({
  reportPopup: {
    padding: theme.spacing(2),
    border: '1px solid #ccc',
    width: '400px',
  },
  reportHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid #000',
    marginBottom: '20px',
  },

  closeBtn: {
    cursor: 'pointer',
    width: '20px',
    height: '20px',
    color: '#fff',
    backgroundColor: '#2e7edb',
    borderRadius: '10px',
    fontSize: '8px',
    textAlign: 'center',
    lineHeight: '20px',
  },

  reportLabel: {
    fontSize: '14px',
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
    marginLeft: theme.spacing(0.5),
  },
  reportOther: {
    fontSize: '14px',
    fontWeight: '600',
    width: '100%',
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
  },
  submitBtn: {
    color: '#fff',
    backgroundColor: '#004e7f',
    border: '1px solid #004e7f',
    fontWeight: 'bold',
    fontSize: '14px',
    lineHeight: '20px',
    padding: '5px 11px',
    borderRadius: '4px',
  },
}));

const FormReport = ({ item, anchorEl, handleClose }) => {
  const classes = useStyles();

  const userLogged = useSelector((state) => state.user.current.user);

  //   const [anchorEl, setAnchorEl] = useState(null);
  //   const handleClick = (event) => {
  //     setAnchorEl(event.currentTarget);
  //   };

  //   const handleClose = () => {
  //     setAnchorEl(null);
  //   };

  const openReport = Boolean(anchorEl);

  const [selectedReports, setSelectedReports] = useState([]);

  const handleCheckbox = (item) => {
    let selected = [...selectedReports];
    let find = selected.indexOf(item);

    if (find > -1) {
      selected.splice(find, 1);
    } else {
      selected.push(item);
    }

    setSelectedReports(selected);
  };

  const handleSubmitReport = async (e) => {
    e.preventDefault();

    // const reportContents = selectedReports.map((item) => item.content);

    // console.log('handle submit report: ', reportContents.toString());

    const response = await postAPI.reportComment({
      email: userLogged.email,
      content: item.content,
      link: window.location.href,
    });
    if (response.succeeded) {
      handleClose();
      Swal.fire(
        'Báo cáo thành công',
        `Bình luận "<b>${item.content}</b>" đã được báo cáo với admin.`,
        'success'
      );
    }
  };
  return (
    <Popover
      id="simple-popover"
      open={openReport}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      <div className={classes.reportPopup}>
        <div className={classes.reportHeader}>
          <h3 style={{ fontSize: '16px' }}>Báo cáo bình luận vi phạm: </h3>
          <div onClick={handleClose} className={classes.closeBtn}>
            X
          </div>
        </div>
        <form onSubmit={handleSubmitReport}>
          {/* {JSON.stringify(selectedReports)} */}
          {reportOptions.map((item) => {
            return (
              <div key={item.id} className="d-block">
                <input
                  type="checkbox"
                  onChange={() => handleCheckbox(item)}
                ></input>

                <label className={classes.reportLabel}>{item.content}</label>
              </div>
            );
          })}
          <label className={classes.reportOther}>Phản hồi khác:</label>
          <textarea rows="5" style={{ width: '100%' }} />

          <button type="submit" className={classes.submitBtn}>
            Gửi
          </button>
        </form>
      </div>
    </Popover>
  );
};

export default FormReport;
