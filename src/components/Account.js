import {
  Avatar,
  Button,
  Col,
  Divider,
  Row,
  Form,
  Input,
  Modal,
  message,
} from "antd";
import Title from "antd/lib/typography/Title";
import React, { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import HackerImage from "./common/hacker.png";
import { logoutUser, userDataChange, userDelete } from "../store/user";
import { Content } from "antd/lib/layout/layout";
import { useHistory } from "react-router-dom";
import { CloudUploadOutlined, DeleteOutlined } from "@ant-design/icons";

const Account = () => {
  const token = localStorage.getItem("token");
  const history = useHistory();
  const dispatch = useDispatch();
  const emailAdress = useSelector(
    (state) => state.users.user.email,
    shallowEqual
  );
  const phone = useSelector((state) => state.users.user.phone, shallowEqual);
  const [visible, setVisible] = useState(false);
  const loading = useSelector((state) => state.users.loading);

  const showModal = () => {
    setVisible(true);
  };
  const removeAccount = () => {
    setVisible(false);
    dispatch(userDelete(token));
    localStorage.removeItem("token");
    dispatch({ type: "userLogout" });
    history.push("/login?logout=true");
  };
  const hideModal = () => {
    setVisible(false);
  };
  const changeEmail = (values) => {
    if (values.email !== emailAdress) {
      dispatch(userDataChange({ email: values.email }, token));
    } else {
      message.warning("Podano ten sam adres Email", 3);
    }
  };

  const changePassword = (values) => {
    dispatch(
      userDataChange(
        { oldPassword: values.oldPassword, newPassword: values.newPassword },
        token
      )
    );
  };

  const changePhone = (values) => {
    dispatch(userDataChange({ phone: values.phone }, token));
  };

  const layout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 10 },
  };
  const tailLayout = {
    wrapperCol: { offset: 0, span: 0 },
  };

  return (
    <React.Fragment>
      <Row justify="start" align="top" style={{ marginLeft: "10%" }}>
        <Col>
          <Title level={2}>Mój Profil</Title>
        </Col>
      </Row>
      <Row
        justify="center"
        align="middle"
        style={{ paddingTop: 30 }}
        gutter={[0, 10]}
      >
        <Col span={22}>
          <AccountCard>
            <Content style={{ overflow: "auto" }}>
              <Row>
                <Col
                  span={24}
                  style={{
                    padding: "20px 0px 50px 0px",
                    marginBottom: "-100px",
                  }}
                >
                  <Row justify="center" align="middle">
                    <Col span={24}>
                      <Divider>Avatar</Divider>
                    </Col>
                  </Row>
                  <Row
                    justify="center"
                    align="middle"
                    style={{ paddingLeft: 30 }}
                  >
                    <Col>
                      <Avatar size={70} src={HackerImage} />
                      <Button
                        icon={<CloudUploadOutlined />}
                        shape="round"
                        style={{ marginLeft: 30 }}
                      >
                        Dodaj Nowy
                      </Button>
                      <Button
                        type="default"
                        shape="round"
                        style={{ marginLeft: 15 }}
                        danger
                        icon={<DeleteOutlined />}
                      >
                        Usuń
                      </Button>
                    </Col>
                  </Row>
                  <Divider>Zmiana Email</Divider>
                  <Row
                    justify="center"
                    align="middle"
                    style={{ paddingLeft: 30 }}
                  >
                    <Col span={12}>
                      <Form
                        {...layout}
                        name="changeEmail"
                        initialValues={{ email: emailAdress }}
                        onFinish={changeEmail}
                      >
                        <Form.Item
                          label="Email"
                          name="email"
                          rules={[
                            {
                              type: "email",
                              message: "Wprowadź poprawny adres email",
                            },
                            {
                              required: true,
                              message: "Wprowadź nowy adres email",
                            },
                          ]}
                          hasFeedback
                        >
                          <Input />
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                          <Button
                            type="default"
                            shape="round"
                            htmlType="submit"
                          >
                            Zmień Email
                          </Button>
                        </Form.Item>
                      </Form>
                    </Col>
                  </Row>
                  <Divider>Zmiana Numeru Telefonu</Divider>
                  <Row
                    justify="center"
                    align="middle"
                    style={{ paddingLeft: 30 }}
                  >
                    <Col span={12}>
                      <Form
                        {...layout}
                        name="changePhone"
                        initialValues={{ phone: phone.slice(3) }}
                        onFinish={changePhone}
                      >
                        <Form.Item
                          label="Numer Telefonu"
                          name="phone"
                          rules={[
                            {
                              required: true,
                              message: "Wprowadź nowy numer telefonu",
                            },
                            {
                              min: 9,
                              message:
                                "Numer Telefonu powinien mieć co najmniej 9 cyfr",
                            },
                            {
                              max: 9,
                              message:
                                "Numer Telefonu powinien mieć maksymalnie 9 cyfr",
                            },
                          ]}
                          hasFeedback
                        >
                          <Input prefix={"+48"} />
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                          <Button
                            type="default"
                            shape="round"
                            htmlType="submit"
                          >
                            Zmień Numer
                          </Button>
                        </Form.Item>
                      </Form>
                    </Col>
                  </Row>
                  <Divider>Zmiana Hasła</Divider>
                  <Row
                    justify="center"
                    align="middle"
                    style={{ paddingLeft: 30 }}
                  >
                    <Col span={12}>
                      <Form
                        {...layout}
                        name="changePassword"
                        onFinish={changePassword}
                      >
                        <Form.Item
                          name="oldPassword"
                          label="Stare Hasło"
                          rules={[
                            {
                              required: true,
                              message: "Wprowadź stare Hasło",
                            },
                          ]}
                          hasFeedback
                        >
                          <Input.Password />
                        </Form.Item>

                        <Form.Item
                          name="newPassword"
                          label="Nowe Hasło"
                          dependencies={["oldPassword"]}
                          rules={[
                            {
                              required: true,
                              message: "Wprowadź nowe Hasło",
                            },
                            {
                              min: 8,
                              message: "Hasło musi mieć co najmniej 8 znaków",
                            },

                            ({ getFieldValue }) => ({
                              validator(rule, value) {
                                if (
                                  !value ||
                                  getFieldValue("oldPassword") !== value
                                ) {
                                  return Promise.resolve();
                                }
                                return Promise.reject(
                                  "Nowe Hasło jest takie same jak Stare Hasło"
                                );
                              },
                            }),
                          ]}
                          hasFeedback
                        >
                          <Input.Password />
                        </Form.Item>

                        <Form.Item
                          name="confirmPassword"
                          label="Potwierdź Nowe Hasło"
                          dependencies={["newPassword"]}
                          hasFeedback
                          rules={[
                            {
                              required: true,
                              message: "Potwierdź swoje nowe hasło",
                            },
                            ({ getFieldValue }) => ({
                              validator(rule, value) {
                                if (
                                  !value ||
                                  getFieldValue("newPassword") === value
                                ) {
                                  return Promise.resolve();
                                }
                                return Promise.reject(
                                  "Wprowadzone hasła nie są z sobą zgodne"
                                );
                              },
                            }),
                          ]}
                        >
                          <Input.Password />
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                          <Button
                            type="default"
                            shape="round"
                            htmlType="submit"
                          >
                            Zmień Hasło
                          </Button>
                        </Form.Item>
                      </Form>
                    </Col>
                  </Row>
                  <Divider>Usuwanie Konta</Divider>
                  <Row
                    justify="center"
                    align="middle"
                    style={{ paddingLeft: 30 }}
                  >
                    <Col span={12}>
                      <Button
                        type="default"
                        shape="round"
                        onClick={showModal}
                        danger
                      >
                        Usuń Konto
                      </Button>
                      <Modal
                        title="Usuwanie Konta"
                        visible={visible}
                        onOk={removeAccount}
                        confirmLoading={loading}
                        onCancel={hideModal}
                      >
                        <p>Czy napewno chcesz usunąć swoje konto ?</p>
                      </Modal>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Content>
          </AccountCard>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Account;

const AccountCard = styled.div`
  height: 100%;
  width: 100%;
  text-align: center;
  border-radius: 25px;
  background-color: #f7f9fb;
  border: 1px solid #e9eff8;
  box-shadow: 0 0 3px rgba(33, 33, 33, 0.2);
`;
