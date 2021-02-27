import {
  Button,
  Col,
  message,
  Row,
  Steps,
  Tabs,
  Form,
  TimePicker,
  Input,
  Checkbox,
  Cascader,
} from "antd";
import Title from "antd/lib/typography/Title";
import React, { useEffect, useState } from "react";
import "./common/styles.css";
import AllegroImg from "./common/allegro.svg";
import eBayImg from "./common/ebay.png";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import {
  allegroUnblock,
  loadAllegroCategories,
  loadAllegroSubCategory,
} from "../store/allegro";
import {
  addUserMonitor,
  changeFormData,
  changeFormTab,
  changeFormTime,
  editUserMonitor,
  getUsermonitor,
  monitorAddStart,
  resetNewMonitor,
} from "../store/monitor";
import { messageRecived } from "../store/message";

const AddNewFollow = () => {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();
  const dispatch = useDispatch();
  const history = useHistory();
  const [status, setStatus] = useState(false);
  const [current, setCurrent] = useState(0);
  const [allegroSelected, setAllegroSelected] = useState(false);
  const options = useSelector((state) => state.allegro.categories);
  const allegroBlocked = useSelector((state) => state.allegro.allegroBlock);
  const [ebayBlocked, setEbayBlocked] = useState(false);
  const [eBaySelected, setEBaySelected] = useState(false);
  const monitorStatus = useSelector((state) => state.monitor.monitorAdded);
  const formData = useSelector((state) => state.monitor.newMonitor);
  const phone = useSelector((state) => state.users.user.phone);

  if (query.get("monitor")) {
    const monitor = query.get("monitor");
    if (!status) {
      dispatch(getUsermonitor(monitor));
      setStatus(true);
    }
  } // eslint-disable-next-line
  useEffect(() => {
    if (status === true) {
      setAllegroSelected(formData.monitorAllegro);
      setEBaySelected(formData.monitorEBay);
    }
  });

  useEffect(() => {
    if (status === true) {
      for (let i = 1; i < formData.kategoriaAllegro.length; i++) {
        dispatch(
          loadAllegroSubCategory({
            categories: options,
            parentID: formData.kategoriaAllegro[i - 1],
          })
        );
      }
    } // eslint-disable-next-line
  }, [status]);

  useEffect(() => {
    dispatch(resetNewMonitor()); // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (monitorStatus === true) history.push("/manage");
    dispatch(monitorAddStart()); // eslint-disable-next-line
  }, [monitorStatus]);

  const { Step } = Steps;
  const { TabPane } = Tabs;

  const config = {
    rules: [
      {
        type: "object",
        required: true,
        message: "Należy wybrać częstotliwość monitorowania",
      },
    ],
  };

  const StepChange = (data) => {
    if (data[0].name !== "czas") dispatch(changeFormData(data));
  };

  const TimePickerChange = (data) => {
    const godzina = 0;
    const minuta = data.minutes();
    dispatch(changeFormTime({ h: godzina, m: minuta }));
  };
  const ColumnChange = (value) => {
    dispatch(changeFormTab(value));
  };

  const selectService = (value) => {
    switch (value) {
      case "Allegro":
        if (!allegroSelected) dispatch(loadAllegroCategories());
        if (allegroSelected) dispatch(allegroUnblock());
        setAllegroSelected(!allegroSelected);

        dispatch(
          changeFormData({
            0: { name: "monitorAllegro", value: !allegroSelected },
          })
        );

        break;
      case "eBay":
        setEBaySelected(!eBaySelected);
        if (!ebayBlocked) {
          dispatch({
            type: messageRecived.type,
            payload: {
              message: "Serwis eBay aktualnie nie funkcjonuje",
              messageType: "warning",
            },
          });
        }
        setEbayBlocked(!ebayBlocked);
        dispatch(
          changeFormData({ 0: { name: "monitorEBay", value: !eBaySelected } })
        );

        break;
      default:
        console.log("Strange Error!!!");
    }
  };

  const loadSubCategor = (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];

    dispatch(
      loadAllegroSubCategory({
        categories: options,
        parentID: targetOption.value,
      })
    );
  };

  const addMonitor = () => {
    const monitor = query.get("monitor");
    if (monitor) dispatch(editUserMonitor(formData));
    else dispatch(addUserMonitor(formData));
  };

  const Step1 = () => {
    return (
      <React.Fragment>
        <Row justify="space-around" align="middle" gutter={[0, 0]}>
          <Col span={11}>
            <ItemCard
              onClick={() => selectService("Allegro")}
              className={allegroSelected ? "selectionActive" : null}
            >
              <Row>
                <Col span={24}>
                  <img src={AllegroImg} width="200px" alt="AllegroIMG" />
                </Col>
              </Row>
            </ItemCard>
          </Col>
          <Col span={11}>
            <ItemCard
              onClick={() => selectService("eBay")}
              className={eBaySelected ? "selectionActive" : null}
            >
              <Row>
                <Col span={24}>
                  <img src={eBayImg} width="150px" alt="eBayIMG" />
                </Col>
              </Row>
            </ItemCard>
          </Col>
        </Row>
      </React.Fragment>
    );
  };

  const Step2 = () => {
    return (
      <React.Fragment>
        <Row justify="center" align="middle">
          <Col span={23}>
            <Tabs
              defaultActiveKey="1"
              type="card"
              size="middle"
              onChange={ColumnChange}
            >
              <TabPane
                tab="Monitoruj po słowach kluczowych i kategoriach"
                key="1"
              >
                <Row justify="center" align="middle">
                  <Col span={24}>
                    <Form
                      labelCol={{ span: 10 }}
                      wrapperCol={{ span: 8 }}
                      onFieldsChange={StepChange}
                      initialValues={{
                        monitorKeyWords: formData.monitorKeyWords
                          ? formData.monitorKeyWords
                          : null,
                        kategoriaAllegro: formData.kategoriaAllegro
                          ? formData.kategoriaAllegro
                          : ["Wszystkie Kategorie"],
                        kategoriaEBay: formData.kategoriaEBay
                          ? formData.kategoriaEBay
                          : ["Wszystkie Kategorie"],
                        monitorKwotaMin: formData.monitorKwotaMin
                          ? formData.monitorKwotaMin
                          : null,
                        monitorKwotaMax: formData.monitorKwotaMax
                          ? formData.monitorKwotaMax
                          : null,
                        monitorMoneyChecked: formData.monitorMoneyChecked
                          ? formData.monitorMoneyChecked
                          : false,
                      }}
                    >
                      <Form.Item
                        name="monitorKeyWords"
                        label="Podaj słowa kluczowe"
                        required="true"
                      >
                        <Input placeholder="iPhone, Samsung, Sony" />
                      </Form.Item>
                      {allegroSelected ? (
                        <Form.Item
                          name="kategoriaAllegro"
                          label="Wybierz kategorie dla Allegro"
                          rules={[
                            {
                              type: "array",
                              required: true,
                              message: "Należy dokonać wyboru",
                            },
                          ]}
                        >
                          <Cascader
                            loadData={loadSubCategor}
                            options={options}
                            changeOnSelect
                          />
                        </Form.Item>
                      ) : null}
                      {eBaySelected ? (
                        <Form.Item
                          name="kategoriaEBay"
                          label="Wybierz kategorie dla eBay"
                          rules={[
                            {
                              type: "array",
                              required: true,
                              message: "Należy dokonać wyboru",
                            },
                          ]}
                        >
                          <Cascader
                            options={[
                              {
                                value: "0",
                                label: "Wszystkie Kategorie",
                                isLeaf: true,
                              },
                            ]}
                          />
                        </Form.Item>
                      ) : null}

                      <Form.Item
                        name="monitorKwotaMin"
                        label="Wyświetlaj oferty od"
                        required={!formData.monitorMoneyChecked}
                      >
                        <Input
                          addonBefore="Od"
                          suffix="zł"
                          disabled={formData.monitorMoneyChecked}
                        />
                      </Form.Item>
                      <Form.Item
                        name="monitorKwotaMax"
                        label="Wyświetlaj oferty do"
                        required={!formData.monitorMoneyChecked}
                      >
                        <Input
                          addonBefore="Do"
                          suffix="zł"
                          disabled={formData.monitorMoneyChecked}
                        />
                      </Form.Item>
                      <Form.Item
                        wrapperCol={{ offset: 10, span: 8 }}
                        name="monitorMoneyChecked"
                        valuePropName="checked"
                      >
                        <Checkbox checked={formData.monitorMoneyChecked}>
                          Monitoruj bez względu na kwotę
                        </Checkbox>
                      </Form.Item>
                    </Form>
                  </Col>
                </Row>
              </TabPane>
              <TabPane
                tab="Monitoruj użytkownika"
                key="2"
                disabled={eBaySelected ? true : false}
              >
                <Row justify="center" align="middle">
                  <Col span={24}>
                    <Form
                      labelCol={{ span: 10 }}
                      wrapperCol={{ span: 8 }}
                      onFieldsChange={StepChange}
                      initialValues={{
                        monitorUsername: formData.monitorUsername
                          ? formData.monitorUsername
                          : null,
                        kategoriaAllegro: formData.kategoriaAllegro
                          ? formData.kategoriaAllegro
                          : ["Wszystkie Kategorie"],
                        kategoriaEBay: formData.kategoriaEBay
                          ? formData.kategoriaEBay
                          : ["Wszystkie Kategorie"],
                        monitorKwotaMin: formData.monitorKwotaMin
                          ? formData.monitorKwotaMin
                          : null,
                        monitorKwotaMax: formData.monitorKwotaMax
                          ? formData.monitorKwotaMax
                          : null,
                        monitorMoneyChecked: formData.monitorMoneyChecked
                          ? formData.monitorMoneyChecked
                          : false,
                      }}
                    >
                      <Form.Item
                        name="monitorUsername"
                        label="Podaj nazwę użytkownika"
                        required="true"
                      >
                        <Input placeholder="andrzej2000" />
                      </Form.Item>
                      {allegroSelected ? (
                        <Form.Item
                          name="kategoriaAllegro"
                          label="Wybierz kategorie dla Allegro"
                          rules={[
                            {
                              type: "array",
                              required: true,
                              message: "Należy dokonać wyboru",
                            },
                          ]}
                        >
                          <Cascader
                            loadData={loadSubCategor}
                            options={options}
                            changeOnSelect
                          />
                        </Form.Item>
                      ) : null}
                      <Form.Item
                        name="monitorKwotaMin"
                        label="Wyświetlaj oferty od"
                        required={!formData.monitorMoneyChecked}
                      >
                        <Input
                          addonBefore="Od"
                          suffix="zł"
                          disabled={formData.monitorMoneyChecked}
                        />
                      </Form.Item>
                      <Form.Item
                        name="monitorKwotaMax"
                        label="Wyświetlaj oferty do"
                        required={!formData.monitorMoneyChecked}
                      >
                        <Input
                          addonBefore="Do"
                          suffix="zł"
                          disabled={formData.monitorMoneyChecked}
                        />
                      </Form.Item>
                      <Form.Item
                        wrapperCol={{ offset: 10, span: 8 }}
                        name="monitorMoneyChecked"
                        valuePropName="checked"
                      >
                        <Checkbox checked={formData.monitorMoneyChecked}>
                          Monitoruj bez względu na kwotę
                        </Checkbox>
                      </Form.Item>
                    </Form>
                  </Col>
                </Row>
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </React.Fragment>
    );
  };

  const Step3 = () => {
    return (
      <React.Fragment>
        <Row justify="center" align="left">
          <Col span={18}>
            <Form
              layout="horizontal"
              name="addMonitor"
              id="addMonitor"
              onFieldsChange={StepChange}
              onFinish={addMonitor}
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 5 }}
              initialValues={{
                monitorName: formData.monitorName ? formData.monitorName : null,
                monitorNotifications: ["email"],
              }}
            >
              <Form.Item
                name="monitorName"
                label="Nazwij monitor"
                rules={[
                  {
                    required: true,
                    message: "Należy wprowadzić nazwę monitora",
                  },
                ]}
              >
                <Input placeholder="np. Monitor Samsung" />
              </Form.Item>
              <Form.Item
                name="czas"
                required="true"
                label="Co ile minut wykonywać pracę monitora: "
                {...config}
              >
                <TimePicker
                  format="mm"
                  showNow={false}
                  onChange={TimePickerChange}
                />
              </Form.Item>
              <Form.Item
                name="monitorNotifications"
                required="false"
                label="Powiadomienia: "
              >
                <Checkbox.Group
                  options={[
                    { label: "Email", value: "email" },
                    {
                      label: "SMS",
                      value: "sms",
                      disabled: phone.length > 3 ? false : true,
                    },
                  ]}
                />
              </Form.Item>
              {phone.length > 3
                ? null
                : "Aby aktywować powiadomienia SMS dodaj swój numer telefonu w zakładce Mój Profil"}
            </Form>
          </Col>
        </Row>
      </React.Fragment>
    );
  };

  const next = () => {
    switch (current) {
      case 0:
        if (allegroSelected || eBaySelected) {
          if (!allegroBlocked && !ebayBlocked && true) {
            console.log(allegroBlocked);
            // dispatch(ebayCategoriesLoad);
            setCurrent(current + 1);
          }
        } else {
          message.info("Należy wybrać co najmniej jeden z serwisów", 3);
        }
        break;
      case 1:
        if (
          // eslint-disable-next-line
          ((formData.monitorKeyWords && formData.monitorType == "1") || // eslint-disable-next-line
            (formData.monitorUsername && formData.monitorType == "2")) &&
          ((formData.monitorKwotaMax && formData.monitorKwotaMin) ||
            formData.monitorMoneyChecked)
        ) {
          console.log(
            formData.monitorKwotaMin <= formData.monitorKwotaMax ||
              formData.monitorMoneyChecked
          );
          if (
            parseInt(formData.monitorKwotaMin) <=
              parseInt(formData.monitorKwotaMax) ||
            formData.monitorMoneyChecked === true
          )
            setCurrent(current + 1);
          else
            message.error(
              "Kwota maksymalna nie może być mniejsza niż minimalna"
            );
        } else {
          message.info("Nie wypełniono wszystkich danych");
        }
        break;
      case 2:
        if (formData.czasH !== 0 || formData.czasM !== 0) {
          setCurrent(current + 1);
        } else {
          message.info("Nie określono czasu odświeżania");
        }
        break;
      default:
        console.log("Default switch content Error propably");
    }
  };

  const back = () => {
    setCurrent(current - 1);
  };

  const steps = [
    {
      title: "Wybierz serwisy",
      content: Step1(),
    },
    {
      title: "Skonfiguruj wyszukiwanie",
      content: Step2(),
    },
    {
      title: "Skonfiguruj pracę monitora",
      content: Step3(),
    },
  ];

  return (
    <React.Fragment>
      <Row
        justify="start"
        align="middle"
        style={{ marginLeft: "10%", marginBottom: "2%" }}
      >
        <Col span={24}>
          <Title level={2} style={{ color: "#1d2a64" }}>
            Dodaj Nowy Monitor
          </Title>
        </Col>
      </Row>
      <Row justify="center" align="middle">
        <Col span={22}>
          <Steps current={current}>
            {steps.map((item) => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
          <div className="steps-content">{steps[current].content}</div>
          <div className="steps-action">
            <Row justify="space-between">
              <Col>
                {current > 0 && (
                  <Button
                    shape="round"
                    style={{ margin: "0 8px" }}
                    onClick={() => back()}
                  >
                    Cofnij
                  </Button>
                )}
              </Col>
              <Col>
                {current < steps.length - 1 && (
                  <Button
                    shape="round"
                    type="primary"
                    onClick={() => next()}
                    disabled={allegroBlocked || ebayBlocked ? true : false}
                  >
                    Dalej
                  </Button>
                )}
                {current === steps.length - 1 && (
                  <Button
                    shape="round"
                    htmlType="submit"
                    type="primary"
                    form="addMonitor"
                  >
                    {query.get("monitor") ? "Zapisz Zmiany" : "Utwórz Monitor"}
                  </Button>
                )}
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default AddNewFollow;

const ItemCard = styled.div`
  height: 100%;
  width: 100%;
  text-align: center;
  border-radius: 25px;
  padding-top: 60px;
  padding-bottom: 60px;
  background-color: #f7f9fb;
  border: 1px solid #e9eff8;
  box-shadow: 0 0 5px rgba(33, 33, 33, 0.2);
  transition: all 0.3s;

  &:hover {
    border: 1px solid #74b9ff;
    box-shadow: 0 0 8px rgba(50, 214, 226, 0.4);
  }
`;
