import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import './style.scss';
import StarIcon from '@material-ui/icons/Star';
import moment from 'moment';
import styled from 'styled-components';

moment.locale('vi');
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function TabsPanel({ tabProps }) {
  console.log('rate for: ', tabProps.rates);
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="">
          <Tab label="Tổng quan" className="no-outline" {...a11yProps(0)} />
          <Tab label="Đánh giá" className="no-outline" {...a11yProps(1)} />
          <Tab
            label="Thông tin người bán"
            className="no-outline"
            {...a11yProps(2)}
          />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} className="tab">
        <div className="d-flex">
          <table className="left-table">
            <tbody>
              <tr>
                <td className="pt-name">Giá</td>
                <td className="p-value">
                  {Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  }).format(tabProps.price)}
                </td>
              </tr>
              <tr>
                <td className="pt-name">Số tầng</td>
                <td className="p-value">{tabProps.numberOfFloor}</td>
              </tr>

              <tr>
                <td className="pt-name">Phòng tắm</td>
                <td className="p-value">3</td>
              </tr>
              <tr>
                <td className="pt-name">Giường ngủ</td>
                <td className="p-value">{tabProps.bedroom}</td>
              </tr>
              <tr>
                <td className="pt-name">Bãi đậu xe</td>
                <td className="p-value">3</td>
              </tr>
              <tr>
                <td className="pt-name">Diện tích mặt tiền</td>
                <td className="p-value">
                  {tabProps.frontiSpiece} m<sup>2</sup>
                </td>
              </tr>
              <tr>
                <td className="pt-name">Diện tích nhà ở</td>
                <td className="p-value">
                  1200 m<sup>2</sup>
                </td>
              </tr>
              <tr>
                <td className="pt-name">Diện tích Gara</td>
                <td className="p-value">
                  200 m<sup>2</sup>
                </td>
              </tr>
            </tbody>
          </table>
          <table className="right-table">
            <tbody>
              <tr>
                <td className="pt-name">Người bán</td>
                <td className="p-value">{tabProps.authorName}</td>
              </tr>
              <tr>
                <td className="pt-name">Số điện thoại</td>
                <td className="p-value">{tabProps.phoneNumber}</td>
              </tr>
              <tr>
                <td className="pt-name">Email</td>
                <td className="p-value">
                  <a href={`mailto:${tabProps.email}`}>{tabProps.email}</a>
                </td>
              </tr>
              <tr>
                <td className="pt-name">Đăng ngày</td>
                <td className="p-value">
                  {tabProps.publicDate.calendar()} (
                  {tabProps.publicDate.fromNow()})
                </td>
              </tr>
              <tr>
                <td className="pt-name">Loại bài viết</td>
                <td className="p-value">{tabProps.category}</td>
              </tr>
              <tr>
                <td className="pt-name">Giấy tờ</td>
                <td className="p-value">{tabProps.juridical}</td>
              </tr>
              <tr>
                <td className="pt-name">Nội thất</td>
                <td className="p-value">{tabProps.furniture}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1} className="tab">
        <>
          <div>
            {tabProps.rates.map((item) => {
              return (
                <div key={item.id} className="rate__item d-flex justify-content-between align-items-center my-3">
                  <div className="d-flex">
                    <p>{item.rating}</p>
                    <StarIcon style={{ color: 'yellow' }} />
                  </div>

                  <div>
                    <p>{item.createdBy}</p>
                  </div>
                  <div>
                    <p>({moment(item.createAt).fromNow()})</p>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      </TabPanel>
      <TabPanel value={value} index={2} className="tab">
        Item Three
      </TabPanel>
    </div>
  );
}
