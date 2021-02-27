import { Col, Divider, Row, Spin } from "antd";
import Title from "antd/lib/typography/Title";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMonitorHistory } from "../store/monitor";
import styled from "styled-components";
import MonitorsHistoryItem from "./MonitorsHistoryItem";

const MonitorsHistory = (params) => {
  const loaded = useSelector((state) => state.monitor.historyLoaded);
  const history = useSelector((state) => state.monitor.history);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMonitorHistory());
  }, [dispatch]);
  if (!loaded) {
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

  if (history.history.length > 0)
    return (
      <React.Fragment>
        <Row
          justify="start"
          align="middle"
          style={{ marginLeft: "10%", marginBottom: "2%" }}
        >
          <Col span={24}>
            <Title level={2} style={{ color: "#1d2a64" }}>
              Historia Monitorowania
            </Title>
          </Col>
        </Row>
        <Row justify="center" align="center">
          <Col span={23}>
            <ItemCard>
              <Row justify="center" align="middle">
                <Col span={4}>Zdjęcie</Col>
                <Col span={10}>Nazwa</Col>
                <Col span={5}>Cena</Col>
                <Col span={5}>Nazwa Monitora</Col>
              </Row>
              <Row justify="center" align="middle">
                <Col span={23}>
                  <Divider style={{ width: "90%" }}></Divider>
                </Col>
              </Row>

              <Row justify="center" align="center">
                {history.history.map((value, index) => {
                  return value.auctions.map((valueAuction, index) => {
                    return (
                      <ItemStyle key={index}>
                        <MonitorsHistoryItem
                          key={valueAuction._id}
                          data={valueAuction}
                          monitorID={value.monitorid}
                          monitors={history.monitors}
                        />
                      </ItemStyle>
                    );
                  });
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
            Historia Monitorowania
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

export default MonitorsHistory;

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
  padding-top: 2px;
  margin-bottom: 5px;
  padding-bottom: 2px;
  background-color: #ffffff;
  border: 1px solid rgba(33, 33, 33, 0.1);
  box-shadow: 0 0 2px rgba(33, 33, 33, 0.2);
`;
