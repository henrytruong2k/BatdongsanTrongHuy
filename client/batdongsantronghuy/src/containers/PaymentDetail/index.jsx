import { Payment, Check } from '@material-ui/icons';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './style.scss';

function PaymentDetail(props) {
  const { post } = props.post; //destruct
  const paymentMethod = props.post;

  return (
    <Container>
      <Row>
        <Col className="col-8">
          <div className="payment__container">
            <div className="payment__content">
              <div>
                <div className="icon-check">
                  <i className="fa fa-check" aria-hidden="true"></i>
                </div>
              </div>
              <div className="post-content">
                <h5>Bạn đã đăng tin thành công</h5>
                <p>
                  Mã tin của bạn là:&nbsp;
                  <span className="text--green">#{post.id}</span>
                </p>
                <p>
                  Phí đăng tin:&nbsp;
                  <span className="text--orangered">
                    {Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    }).format(paymentMethod.amount.replace('VND', ''))}
                  </span>
                </p>
                <p>
                  Bạn có thể tham khảo các hình thức nạp tiền&nbsp;
                  <span className="text--orangered">tại đây</span>
                </p>
                <p>
                  Bạn có thể chuyển sang hình thức tin VIP với hiệu quả hơn
                  nhiều lần.
                </p>
                <p>
                  Xem <span className="text--orangered">tại đây</span>.
                </p>
              </div>
            </div>
            <div className="payment__footer">
              Mọi thắc mắc xin vui lòng liên hệ tổng đài CSKH:
              <div className="phone-contact">
                <div>
                  <i className="fa fa-phone" aria-hidden="true"></i>
                </div>
                <span>1900 1881</span>
              </div>
            </div>
          </div>
        </Col>
        <Col className="col-4">
          <div className="payment__method">
            <h5>Phương thức thanh toán</h5>
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
            {paymentMethod.momoCheckout && (
              <a
                rel="noreferrer"
                target="_blank"
                className="payment payment__momo"
                href={paymentMethod.momoCheckout}
              >
                <img src="/assets/icons/momo.png" alt="Thanh toán bằng Momo" />
              </a>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default PaymentDetail;
