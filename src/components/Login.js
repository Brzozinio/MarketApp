import React from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { loginUser } from "../store/user";
import { Link, Redirect } from "react-router-dom";
import { Input, Form, Button, Checkbox, Row, Col, Image, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import LogoImg from "./common/logo.png";

const Login = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const logged = useSelector((state) => state.users.logged, shallowEqual);
  const loading = useSelector((state) => state.users.loading, shallowEqual);

  const login = (values) => {
    dispatch(
      loginUser({
        email: values.email,
        password: values.password,
      })
    );
  };
  if (token || logged) {
    return <Redirect to="/" />;
  }

  return (
    <React.Fragment>
      <Row justify="center" align="middle">
        <Col justify="center" style={{ width: "45%" }}>
          <Image src={LogoImg} />
        </Col>
      </Row>
      <Row justify="center" align="middle">
        <Col span={6}>
          <h1
            style={{
              width: "100%",
              borderRadius: "25px",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Logowanie
          </h1>
          <Form
            name="login"
            className="login-form"
            initialValues={{
              remember: false,
            }}
            onFinish={login}
          >
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
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Proszę podać hasło!",
                },
                {
                  min: 8,
                  message: "Co najmniej 8 znaków",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Hasło"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item
                align="space-between"
                name="remember"
                valuePropName="checked"
                noStyle
              >
                <Checkbox>Zapamiętaj mnie</Checkbox>
              </Form.Item>
            </Form.Item>
            <Row justify="center" align="middle" gutter={6}>
              <Col>
                <Form.Item style={{ margin: 0 }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    shape="round"
                    className="login-form-button"
                    loading={loading}
                  >
                    Zaloguj
                  </Button>
                </Form.Item>
              </Col>
              <Col>
                <Button type="primary" shape="round">
                  <Link to="/signup">Zarejestruj się</Link>
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      <Row justify="center" style={{ paddingTop: 20 }}>
        <Col>
          <Link to="/recovery">Zapomniałem hasła</Link>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Login;
