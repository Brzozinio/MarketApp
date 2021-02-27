import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import {
  deleteAllegroToken,
  loadAllegroUserData,
  registerAllegroAccount,
} from "../store/allegro";
import { Button, Col, Row, Spin } from "antd";
import styled from "styled-components";
import Title from "antd/lib/typography/Title";
import AllegroImg from "./common/allegro.svg";
import EbayImg from "./common/ebay.png";
import {
  deleteEbayToken,
  loadEbayUserData,
  registerEbayAccount,
} from "../store/ebay";

const Settings = () => {
  const token = localStorage.getItem("token");

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const dispatch = useDispatch();
  const history = useHistory();
  const query = useQuery();
  const isAllegroLogged = useSelector(
    (state) => state.allegro.isAllegroRegistered
  );
  const isEbayLogged = useSelector((state) => state.ebay.isEbayRegistered);
  const allegroUser = useSelector((state) => state.allegro.user);
  const loaded = useSelector((state) => state.allegro.loaded);

  if (query.get("code")) {
    console.log(query.get("code"));
    if (document.referrer == "https://auth.ebay.com/") {
      dispatch(registerEbayAccount(token, { code: query.get("code") }));
    } else {
      dispatch(registerAllegroAccount(token, { code: query.get("code") }));
    }
    history.push("/settings");
  }

  const registerAllegro = () => {
    window.location = process.env.REACT_APP_ALLEGRO_REGISTER;
  };

  const registerEbay = () => {
    window.location = process.env.REACT_APP_EBAY_REGISTER;
  };

  const deleteAllegro = () => {
    dispatch(deleteAllegroToken());
  };

  const deleteEbay = () => {
    dispatch(deleteEbayToken());
  };

  useEffect(() => {
    // eslint-disable-next-line
    if (loaded === false) {
      dispatch(loadAllegroUserData());
      //dispatch(loadEbayUserData());
    }
  }, [loaded]);

  if (!loaded)
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

  return (
    <React.Fragment>
      <Row
        justify="start"
        align="middle"
        style={{ marginLeft: "10%", marginBottom: "2%" }}
      >
        <Col span={24}>
          <Title level={2} style={{ color: "#1d2a64" }}>
            Ustawienia
          </Title>
        </Col>
      </Row>
      <Row justify="space-around" align="middle">
        <Col span={9}>
          <ItemCard>
            <Row justify="center" align="middle">
              <Col span={24}>
                <img width="300px" alt="Zdjęcie Allego" src={AllegroImg} />
              </Col>
            </Row>
            <Row style={{ paddingTop: "40px" }}>
              <Col span={24} style={{ fontWeight: "600", color: "#1d2a64" }}>
                Status:{" "}
                {isAllegroLogged ? "Konto powiązane" : "Konto niepowiązane"}
              </Col>
              {isAllegroLogged ? (
                <React.Fragment>
                  <Col
                    span={24}
                    style={{
                      fontWeight: "600",
                      paddingTop: "10px",
                      color: "#1d2a64",
                    }}
                  >
                    ID Konta: {isAllegroLogged ? allegroUser.id : null}
                  </Col>
                  <Col
                    span={24}
                    style={{
                      fontWeight: "600",
                      paddingTop: "10px",
                      color: "#1d2a64",
                    }}
                  >
                    Login: {isAllegroLogged ? allegroUser.login : null}
                  </Col>
                  <Col
                    span={24}
                    style={{
                      fontWeight: "600",
                      paddingTop: "10px",
                      color: "#1d2a64",
                    }}
                  >
                    Powiązany Email:{" "}
                    {isAllegroLogged ? allegroUser.email : null}
                  </Col>
                </React.Fragment>
              ) : null}

              <Col span={24}>
                {isAllegroLogged ? (
                  <Button
                    type="primary"
                    shape="round"
                    style={{ marginTop: "50px" }}
                    onClick={deleteAllegro}
                    danger
                  >
                    Usuń powiązanie
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    shape="round"
                    style={{ marginTop: "50px" }}
                    onClick={registerAllegro}
                  >
                    Dodaj swoje konto Allegro
                  </Button>
                )}
              </Col>
            </Row>
          </ItemCard>
        </Col>
        <Col span={9}>
          <ItemCard>
            <Row justify="center" align="middle">
              <Col span={24}>
                <img width="230px" alt="Zdjęcie eBay" src={EbayImg} />
              </Col>
            </Row>
            <Row
              style={{
                paddingTop: "40px",
                fontWeight: "600",
                color: "#1d2a64",
              }}
            >
              <Col span={24}>
                {isEbayLogged ? "Konto powiązane" : "Konto niepowiązane"}
              </Col>
              <Col span={24}>
                {isEbayLogged ? (
                  <Button
                    type="primary"
                    shape="round"
                    style={{ marginTop: "50px" }}
                    onClick={deleteEbay}
                    danger
                  >
                    Usuń powiązanie
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    shape="round"
                    style={{ marginTop: "50px" }}
                    onClick={registerEbay}
                    disabled
                  >
                    Dodaj swoje konto EBay
                  </Button>
                )}
              </Col>
            </Row>
          </ItemCard>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Settings;

const ItemCard = styled.div`
  height: 100%;
  width: 100%;
  text-align: center;
  border-radius: 25px;
  padding-top: 30px;
  padding-bottom: 30px;
  background-color: #f7f9fb;
  border: 1px solid #e9eff8;
  box-shadow: 0 0 3px rgba(33, 33, 33, 0.2);
`;
