import React from "react";
import { useDispatch } from "react-redux";
import { Form, Input, Button, Checkbox, Row, Col, Image } from "antd";
import LogoImg from "./common/logo.png";
import { registerUser } from "../store/user";
import { Link, useHistory } from "react-router-dom";
import Title from "antd/lib/typography/Title";
import { LeftOutlined } from "@ant-design/icons";

const Signup = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [form] = Form.useForm();
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
      xl: { span: 10 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
      xl: { span: 5 },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 8,
      },
      sm: {
        span: 16,
        offset: 8,
      },
      xl: {
        span: 5,
        offset: 10,
      },
    },
  };
  const buttonFormItem = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 8,
      },
      sm: {
        span: 16,
        offset: 8,
      },
      xl: {
        span: 4,
        offset: 11,
      },
    },
  };

  const register = (values) => {
    //For ACTIVATION KEY
    // const { name, email, password, activationKey } = values;
    const { name, email, password } = values;
    let phone = "+48" + values.phone;
    dispatch(
      registerUser({
        name,
        email,
        password,
        phone,
      })
    );
    history.push("/");
  };
  return (
    <React.Fragment>
      <Row justify="center" align="middle">
        <Col justify="center" style={{ width: "45%" }}>
          <Image src={LogoImg} />
        </Col>
      </Row>
      <Row justify="center" align="center">
        <Col span={24}>
          <Title
            style={{ textAlign: "center", paddingBottom: "20px" }}
            level={5}
          >
            Zarejestruj Się
          </Title>

          <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={register}
            scrollToFirstError
          >
            <Form.Item
              name="name"
              label="Imię i Nazwisko"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Imię i Nazwisko jest wymagane",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="email"
              label="E-mail"
              hasFeedback
              rules={[
                {
                  type: "email",
                  message: "Podano niepoprawny adres email",
                },
                {
                  required: true,
                  message: "Adres email jest wymagany",
                },
              ]}
            >
              <Input />
            </Form.Item>

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
                    return Promise.reject(
                      "Podane hasła nie są ze sobą zgodne!"
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="phone"
              label="Numer Telefonu"
              rules={[
                {
                  required: false,
                  message: "Proszę podać numer telefonu!",
                  min: 9,
                  max: 9,
                },
              ]}
            >
              <Input prefix="+48" style={{ width: "100%" }} />
            </Form.Item>

            {/* <Form.Item
              label="Klucz Aktywacyjny"
              extra="Klucz aktywacyjny jest wymagany do utworzenia konta."
            >
              <Form.Item
                name="activationKey"
                noStyle
                rules={[
                  {
                    required: true,
                    message: "Proszę wprowadzić kod aktywacyjny.",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Form.Item> */}

            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject("Należy zaakceptować Regulamin!"),
                },
              ]}
              {...tailFormItemLayout}
            >
              <Checkbox>
                Przeczytałem <a href={"regulamin.txt"}>regulamin</a>
              </Checkbox>
            </Form.Item>
            <Form.Item {...buttonFormItem}>
              <Button type="primary" shape="round" htmlType="submit">
                Zarejestruj się
              </Button>
            </Form.Item>
          </Form>
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
    </React.Fragment>
  );
};

export default Signup;
