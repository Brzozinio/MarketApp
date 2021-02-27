import { Card, Col, Divider, Row, Spin, Statistic } from "antd";
import Title from "antd/lib/typography/Title";
import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { loadUserDashboard } from "../store/user";
import MonitorHistory from "./MonitorHistory";

const Dashboard = () => {
  const dispatch = useDispatch();
  const dashboardData = useSelector((state) => state.users.dashboard);
  const offers = useSelector((state) => state.users.dashboard[0].history);
  const loading = useSelector((state) => state.users.dashboardLoaded);

  useEffect(() => {
    dispatch(loadUserDashboard()); // eslint-disable-next-line
  }, []);
  if (!loading) {
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
  } else
    return (
      <React.Fragment>
        <Row
          justify="start"
          align="middle"
          style={{ marginLeft: "10%", marginBottom: "5%" }}
        >
          <Col span={24}>
            <Title level={2} style={{ color: "#1d2a64" }}>
              Panel Główny
            </Title>
          </Col>
        </Row>

        <Row
          justify="space-around"
          align="top"
          style={{
            paddingLeft: "50px",
            paddingRight: "50px",
          }}
        >
          <Col span={6}>
            <Card
              style={{
                width: "100%",
                height: "150px",
                borderRadius: 15,
                backgroundColor: "#34495e",
                color: "white",
                fontWeight: "bold",
                border: "1px solid #34495e",
                boxShadow: "0 0 1px rgba(33,33,33,.2)",
              }}
            >
              <Statistic
                title={
                  <h2 style={{ color: "white", fontWeight: "bold" }}>
                    Ilość aktywnych monitorów
                  </h2>
                }
                value={dashboardData ? dashboardData[0].monitors : 0}
                precision={0}
                valueStyle={{ color: "white" }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card
              style={{
                width: "100%",
                height: "150px",
                borderRadius: 15,
                backgroundColor: "#3498db",
                color: "white",
                fontWeight: "bold",
                border: "1px solid #3498db",
                boxShadow: "0 0 1px rgba(33,33,33,.2)",
              }}
            >
              <Statistic
                title={
                  <h2 style={{ color: "white", fontWeight: "bold" }}>
                    Otrzymane Powiadomienia
                  </h2>
                }
                value={dashboardData ? dashboardData[0].messages : 0}
                precision={0}
                valueStyle={{ color: "white" }}
              />
            </Card>
          </Col>

          <Col span={6}>
            <Card
              style={{
                width: "100%",
                height: "150px",
                borderRadius: 15,
                backgroundColor: "#e67e22",
                color: "white",
                fontWeight: "bold",
                border: "1px solid #e67e22",
                boxShadow: "0 0 1px rgba(33,33,33,.2)",
              }}
            >
              <Statistic
                title={
                  <h2 style={{ color: "white", fontWeight: "bold" }}>
                    Zmonitorowane Oferty
                  </h2>
                }
                value={dashboardData ? dashboardData[0].offers : 0}
                precision={0}
                valueStyle={{ color: "white" }}
              />
            </Card>
          </Col>
        </Row>

        <Row
          justify="start"
          align="middle"
          style={{ marginLeft: "10%", marginBottom: "2%", marginTop: "6%" }}
        >
          <Col span={24}>
            <Title level={3} style={{ color: "#1d2a64" }}>
              Ostatnie wyniki
            </Title>
          </Col>
        </Row>
        <ItemCard>
          <Row justify="center" align="middle">
            <Col span={4}>Zdjęcie</Col>
            <Col span={2}>Serwis</Col>
            <Col span={12}>Nazwa Aukcji</Col>
            <Col span={6}>Cena</Col>
          </Row>
          <Row justify="center" align="middle">
            <Col span={23}>
              <Divider style={{ width: "90%" }}></Divider>
            </Col>
          </Row>
          {offers.length ? (
            <Row justify="center" align="center">
              {offers.map((value, index) => {
                return value.auctions.map((auctionValue, auctionIndex) => {
                  return (
                    <ItemStyle key={auctionValue.id}>
                      <MonitorHistory params={auctionValue} other={value} />
                    </ItemStyle>
                  );
                });
              })}
            </Row>
          ) : (
            "Brak Wyników"
          )}
        </ItemCard>
      </React.Fragment>
    );
};

export default Dashboard;

const ItemCard = styled.div`
  text-align: center;
  border-radius: 25px;
  padding-top: 60px;
  padding-bottom: 60px;
  margin-left: 35px;
  margin-right: 35px;
  background-color: #f7f9fb;
  border: 1px solid #e9eff8;
  box-shadow: 0 0 5px rgba(33, 33, 33, 0.2);
  transition: all 0.3s;
`;

const ItemStyle = styled.div`
  height: 100%;
  width: 98%;
  text-align: center;
  margin-bottom: 5px;
  background-color: #ffffff;
  border: 1px solid rgba(33, 33, 33, 0.1);
  box-shadow: 0 0 2px rgba(33, 33, 33, 0.2);
`;
