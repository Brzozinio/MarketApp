import { Col, Divider, Row, Spin } from "antd";
import Title from "antd/lib/typography/Title";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getUserMonitors } from "../store/monitor";

import ManageMonitor from "./ManageMonitor";

const Manage = () => {
  const dispatch = useDispatch();
  const monitors = useSelector((state) => state.monitor.monitors);
  const monitorsLoaded = useSelector((state) => state.monitor.monitorsLoaded);
  useEffect(() => {
    dispatch(getUserMonitors()); // eslint-disable-next-line
  }, []);

  if (!monitorsLoaded) {
    return (
      <React.Fragment>
        <Row
          justify="center"
          align="center"
          style={{ height: "100%", width: "100%" }}
        >
          <Col span={2}>
            <Spin tip={"Loading..."} />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
  if (monitors.length > 0)
    return (
      <React.Fragment>
        <Row
          justify="start"
          align="middle"
          style={{ marginLeft: "10%", marginBottom: "2%" }}
        >
          <Col span={24}>
            <Title level={2} style={{ color: "#1d2a64" }}>
              Zarządzaj Monitorami
            </Title>
          </Col>
        </Row>
        <Row justify="center" align="center">
          <Col span={23}>
            <ItemCard>
              <Row justify="center" align="middle">
                <Col span={6}>Nazwa</Col>
                <Col span={6}>Status</Col>
                <Col span={6}>Serwisy</Col>
                <Col span={6}>Funkcje</Col>
              </Row>
              <Row justify="center" align="middle">
                <Col span={23}>
                  <Divider style={{ width: "90%" }}></Divider>
                </Col>
              </Row>

              <Row justify="center" align="center">
                {monitors.map((value, index) => {
                  return (
                    <ItemStyle key={value._id}>
                      <ManageMonitor
                        id={value._id}
                        name={value.monitorName}
                        status={value.monitorStatus}
                        allegro={value.monitorAllegro}
                        ebay={value.monitorEBay}
                      />
                    </ItemStyle>
                  );
                })}
              </Row>
            </ItemCard>
          </Col>
        </Row>
      </React.Fragment>
    );

  return (
    <React.Fragment>
      <Row
        justify="start"
        align="middle"
        style={{ marginLeft: "10%", marginBottom: "2%" }}
      >
        <Col span={24}>
          <Title level={2} style={{ color: "#1d2a64" }}>
            Zarządzaj Monitorami
          </Title>
        </Col>
      </Row>
      <Row justify="center" align="center">
        <Col span={23}>
          <h2>Nie Dodałes jeszcze żadnych monitorów</h2>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Manage;

const ItemCard = styled.div`
  height: 100%;
  width: 100%;
  text-align: center;
  border-radius: 25px;
  padding-top: 30px;
  padding-bottom: 30px;
  background-color: #f7f9fb;
  border: 1px solid #e9eff8;
  box-shadow: 0 0 4px rgba(33, 33, 33, 0.2);
`;

const ItemStyle = styled.div`
  height: 100%;
  width: 98%;
  text-align: center;
  padding-top: 25px;
  margin-bottom: 5px;
  padding-bottom: 25px;
  background-color: #ffffff;
  border: 1px solid rgba(33, 33, 33, 0.1);
  box-shadow: 0 0 2px rgba(33, 33, 33, 0.2);
`;
