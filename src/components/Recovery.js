import { Col, Image, Row, Form, Input, Button } from "antd";
import { UserOutlined, LeftOutlined } from "@ant-design/icons";
import Title from "antd/lib/typography/Title";
import React, { useEffect } from "react";
import LogoImg from "./common/logo.png";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import {
  resetPassword,
  restoreUserAccount,
  verifyRestoreCode,
} from "../store/user";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Recovery = () => {
  const dispatch = useDispatch();
  const query = useQuery();
  const code = query.get("code");
  const history = useHistory();
  const isMessage = useSelector(
    (state) => state.messages.isMessage,
    shallowEqual
  );
  const messageType = useSelector(
    (state) => state.messages.messageType,
    shallowEqual
  );
  const loading = useSelector((state) => state.users.loading, shallowEqual);

  useEffect(() => {
    if (code && isMessage === false)
      dispatch(verifyRestoreCode({ code: code }));
    if (isMessage && messageType === "error") {
      history.push("/");
    }
  });

  const restorePassword = (values) => {
    dispatch(
      restoreUserAccount({
        email: values.email,
      })
    );
  };
  const resetPass = (values) => {
    dispatch(
      resetPassword({
        code: code,
        password: values.password,
      })
    );
    history.push("/");
  };

  if (code)
    return (
      <React.Fragment>
        <Row justify="center" align="middle">
          <Col justify="center" style={{ width: "45%" }}>
            <Image src={LogoImg} />
          </Col>
        </Row>
        <Row justify="center" align="middle">
          <Col>
            <Title level={5}>Wprowadź nowe Hasło</Title>
          </Col>
        </Row>

        <Form
          name="login"
          className="login-form"
          layout="horizontal"
          onFinish={resetPass}
          labelCol={{ span: 11 }}
          wrapperCol={{ span: 3 }}
        >
          <Form.Item
            name="password"
            label="Hasło"
            rules={[
              {
                required: true,
                message: "Proszę podać hasło!",
              },
              {
                min: 8,
                message: "Hasło powinno zawierać co najmniej 8 znaków",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Powtórz Hasło"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Proszę powtórzyć hasło!",
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Podane hasła nie są ze sobą zgodne!");
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Row justify="center" align="middle">
            <Col>
              <Form.Item style={{ margin: 0 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  shape="round"
                  className="login-form-button"
                  loading={loading}
                >
                  Przywróć Hasło
                </Button>
              </Form.Item>
            </Col>
          </Row>
          <Row justify="center" align="middle" style={{ paddingTop: 30 }}>
            <Col>
              <Link to="/login">
                <Button icon={<LeftOutlined />} type="default" shape="round">
                  Wróć do Logowania
                </Button>
              </Link>
            </Col>
          </Row>
        </Form>
      </React.Fragment>
    );
  else
    return (
      <React.Fragment>
        <Row justify="center" align="middle" style={{ paddingBottom: "30px" }}>
          <Col justify="center" style={{ width: "45%" }}>
            <Image src={LogoImg} />
          </Col>
        </Row>
        <Row justify="center" align="middle">
          <Col>
            <Title level={5}>Zapomniałem Hasła</Title>
          </Col>
        </Row>
        <Form name="login" className="login-form" onFinish={restorePassword}>
          <Row justify="center" align="middle">
            <Col>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Proszę podać adres email!",
                  },
                  {
                    type: "email",
                    message: "Wprowadzono błędny adres email",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Email"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row justify="center" align="middle">
            <Col>
              <Form.Item style={{ margin: 0 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  shape="round"
                  className="login-form-button"
                  loading={loading}
                >
                  Przywróć Hasło
                </Button>
              </Form.Item>
            </Col>
          </Row>
          <Row justify="center" align="middle" style={{ paddingTop: 100 }}>
            <Col>
              <Link to="/login">
                <Button icon={<LeftOutlined />} type="default" shape="round">
                  Wróć do Logowania
                </Button>
              </Link>
            </Col>
          </Row>
        </Form>
      </React.Fragment>
    );
};

export default Recovery;
