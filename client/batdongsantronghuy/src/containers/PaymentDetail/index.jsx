import { Payment, Check } from '@material-ui/icons';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './style.scss';

function PaymentDetail(props) {
  const { post } = props.post; //destruct
  const paymentMethod = props.post;

  return (
    <Container>
      <h4>
        <Payment />
        &nbsp;THANH TOÁN
      </h4>
      <Row>
        <Col className="col-8">
          <div className="my-5">
            <h5>Thông tin người đăng</h5>
            <ul>
              <li className="mb-2">
                <span className="mr-1">
                  <Check htmlColor="green" />
                </span>
                <span>Họ tên: {post.nameContact}</span>
              </li>
              <li className="mb-2">
                <span className="mr-1">
                  <Check htmlColor="green" />
                </span>
                <span>Email: {post.emailContact}</span>
              </li>
              <li className="mb-2">
                <span className="mr-1">
                  <Check htmlColor="green" />
                </span>
                <span>SĐT: {post.phoneContact}</span>
              </li>
              <li className="mb-2">
                <span className="mr-1">
                  <Check htmlColor="green" />
                </span>
                <span>Địa chỉ: {post.addressContact}</span>
              </li>
            </ul>
          </div>
          <div className="my-5">
            <h5>Thông tin bài viết</h5>
            <ul>
              <li className="mb-2">
                <span className="mr-1">
                  <Check htmlColor="green" />
                </span>
                <span>Tiêu đề: {post.title}</span>
              </li>
              <li className="mb-2">
                <span className="mr-1">
                  <Check htmlColor="green" />
                </span>
                <span>
                  Giá:&nbsp;
                  <b>
                    {Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    }).format(post.price)}
                  </b>
                </span>
              </li>
              <li className="mb-2">
                <span className="mr-1">
                  <Check htmlColor="green" />
                </span>
                <span>Danh mục: {post.category.name}</span>
              </li>

              <li className="mb-2">
                <span className="mr-1">
                  <Check htmlColor="green" />
                </span>
                <span>Dự án: {post.project.name}</span>
              </li>
              <li className="mb-2">
                <span className="mr-1">
                  <Check htmlColor="green" />
                </span>
                <span>Thành phố: {post.address.city.cityName}</span>
              </li>
              <li className="mb-2">
                <span className="mr-1">
                  <Check htmlColor="green" />
                </span>
                <span>Quận: {post.address.district.districtName}</span>
              </li>
              <li className="mb-2">
                <span className="mr-1">
                  <Check htmlColor="green" />
                </span>
                <span>Đường: {post.address.street}</span>
              </li>
              <li className="mb-2 d-flex">
                <span className="mr-1">
                  <Check htmlColor="green" />
                </span>
                <span className="d-flex">
                  Mô tả:&nbsp;
                  <p
                    className="description"
                    dangerouslySetInnerHTML={{ __html: post.description }}
                  />
                </span>
              </li>
              <li className="mb-2">
                <span className="mr-1">
                  <Check htmlColor="green" />
                </span>
                <span>Hình ảnh:</span>
                <div className="mt-3">
                  {post.images.map((item, index) => {
                    return (
                      <div key={index}>
                        <img
                          src={item.url}
                          alt={item.post.title}
                          width="100"
                          height="100"
                        />
                      </div>
                    );
                  })}
                </div>
              </li>
            </ul>
          </div>
        </Col>
        <Col className="col-4">
          <div className="my-5">
            <h5>Thông tin thanh toán</h5>
            <p className="paid">
              Số tiền:&nbsp;
              <b>
                {Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                }).format(paymentMethod.amount.replace('VND', ''))}
              </b>
            </p>
            <h6>Chọn phương thức thanh toán:</h6>
            {paymentMethod.payPalCheckout && (
              <a
                rel="noreferrer"
                target="_blank"
                className="payment payment__paypal"
                href={paymentMethod.payPalCheckout.link_Checkout}
              >
                <img
                  src="/assets/icons/paypal.svg"
                  alt="Thanh toán bằng Paypal"
                />
              </a>
            )}
            {paymentMethod.zaloPayCheckout && (
              <a
                rel="noreferrer"
                target="_blank"
                className="payment payment__zalopay"
                href={paymentMethod.zaloPayCheckout}
              >
                <img
                  src="/assets/icons/zalopay.png"
                  alt="Thanh toán bằng Zalopay"
                />
              </a>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default PaymentDetail;
