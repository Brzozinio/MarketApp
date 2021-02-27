import React from "react";
import { Col, Row, Image, Card, Avatar, Typography } from "antd";
import Logo from "../components/common/logo.png";
import AvatarImg from "../components/common/hacker.png";
import HomeImg from "../components/common/home.png";
import AddImg from "../components/common/add.png";
import SettingsImg from "../components/common/setting.png";
import GraphImg from "../components/common/graph.png";
import UserImg from "../components/common/user.png";
import AdminImg from "../components/common/admin.png";
import HistoryImg from "../components/common/history.png";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import "./common/styles.css";

const { Title } = Typography;

const SidebarComponent = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isAdmin = useSelector((state) => state.users.user.isAdmin);
  const username = useSelector((state) => state.users.user.name);

  const logout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "userLogout" });
    history.push("/login?logout=true");
  };

  return (
    <React.Fragment>
      <Row gutter={[0, 10]}>
        <Col span={24}>
          <Row justify="center" style={{ width: "100%" }}>
            <Col span={24}>
              <Image style={{ paddingTop: "10px" }} src={Logo} />
            </Col>
            <Col span={24}>
              <Row
                style={{ paddingTop: "120px", paddingLeft: 50 }}
                justify="center"
                align="middle"
                gutter={[0, 20]}
              >
                <Col span={24} justify="center" align="left">
                  <NavLink
                    exact
                    to="/"
                    className="menuButton"
                    activeClassName="activeMenuButton"
                  >
                    <Avatar size={{ xxl: 24 }} src={HomeImg} /> Panel Główny
                  </NavLink>
                </Col>
                <Col span={24} justify="center" align="left">
                  <NavLink
                    exact
                    to="/new"
                    className="menuButton"
                    activeClassName="activeMenuButton"
                  >
                    <Avatar size={{ xxl: 24 }} src={AddImg} /> Dodaj Nowy
                    Monitor
                  </NavLink>
                </Col>
                <Col span={24} justify="center" align="left">
                  <NavLink
                    exact
                    to="/manage"
                    className="menuButton"
                    activeClassName="activeMenuButton"
                  >
                    <Avatar size={{ xxl: 24 }} src={GraphImg} /> Zarządzaj
                    Monitorami
                  </NavLink>
                </Col>
                <Col span={24} justify="center" align="left">
                  <NavLink
                    exact
                    to="/history"
                    className="menuButton"
                    activeClassName="activeMenuButton"
                  >
                    <Avatar size={{ xxl: 24 }} src={HistoryImg} /> Historia
                    Monitorowania
                  </NavLink>
                </Col>
                <Col span={24} justify="center" align="left">
                  <NavLink
                    exact
                    to="/account"
                    className="menuButton"
                    activeClassName="activeMenuButton"
                  >
                    <Avatar size={{ xxl: 24 }} src={UserImg} /> Mój Profil
                  </NavLink>
                </Col>
                <Col span={24} justify="center" align="left">
                  <NavLink
                    exact
                    to="/settings"
                    className="menuButton"
                    activeClassName="activeMenuButton"
                  >
                    <Avatar size={{ xxl: 24 }} src={SettingsImg} /> Ustawienia
                  </NavLink>
                </Col>

                {isAdmin ? (
                  <Col span={24} justify="center" align="left">
                    <NavLink
                      exact
                      to="/admin"
                      className="menuButton"
                      activeClassName="activeMenuButton"
                    >
                      <Avatar size={{ xxl: 24 }} src={AdminImg} /> Panel
                      Administratora
                    </NavLink>
                  </Col>
                ) : null}
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row span={24} justify="center" style={{ width: "100%" }}>
            <Col span={22}>
              <Card
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 25,
                  border: "1px solid #e9eff8",
                  boxShadow: "0 0 1px rgba(33,33,33,.2)",
                }}
              >
                <Row justify="center" align="middle">
                  <Col span={24} align="middle">
                    <Avatar
                      size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 80 }}
                      src={AvatarImg}
                    />
                  </Col>
                  <Col span={24} align="middle">
                    <Title
                      style={{ color: "#1d2a64", margin: "0px" }}
                      level={3}
                    >
                      Hej {username.replace(/ .*/, "")},
                    </Title>
                    <Title
                      style={{
                        color: "#7c98b1",
                        marginTop: 0,
                        marginBottom: 30,
                      }}
                      level={5}
                    >
                      Witaj z powrotem
                    </Title>
                  </Col>
                  <Col span={24} align="middle">
                    <LogoutButton onClick={logout}>Wyloguj</LogoutButton>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default SidebarComponent;

const LogoutButton = styled.button`
  background-color: #9ef7db;
  border: 3px solid #9ef7db;
  color: #1d2a64;
  border-radius: 25px;
  padding: 10px 20px 10px 20px;
  font-weight: bold;
  font-size: 13px;

  &:hover {
    background-color: #1d2a64;
    border: 3px solid #1d2a64;
    color: #ffffff;
    cursor: pointer;
  }
`;
