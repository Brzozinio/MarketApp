import { Badge, Button, Col, Row, Tag } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { changeUserMonitorStatus, deleteUserMonitor } from "../store/monitor";

const ManageMonitor = (params) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const changeMonitorStatus = () => {
    dispatch(changeUserMonitorStatus({ monitorID: params.id }));
  };

  const deleteMonitor = () => {
    dispatch(deleteUserMonitor({ monitorID: params.id }));
  };
  const editMonitor = () => {
    history.push("/new?monitor=" + params.id);
  };

  return (
    <React.Fragment>
      <Row justify="center" align="middle">
        <Col span={6}>{params.name}</Col>
        <Col span={6}>
          <span>
            <Badge status={params.status ? "success" : "error"} />
            {params.status ? "Aktywny" : "Nieaktywny"}
          </span>
        </Col>
        <Col span={6}>
          <Tag color={params.allegro ? "green" : "volcano"} key="Allegro">
            Allegro
          </Tag>
          <Tag color={params.ebay ? "green" : "volcano"} key="eBay">
            eBay
          </Tag>
        </Col>
        <Col span={6}>
          <Button
            style={{ marginLeft: 3 }}
            type="default"
            shape="round"
            onClick={editMonitor}
          >
            Edytuj
          </Button>
          {params.status ? (
            <Button
              style={{ marginLeft: 3 }}
              type="default"
              shape="round"
              onClick={changeMonitorStatus}
              danger
            >
              Wyłącz
            </Button>
          ) : (
            <Button
              style={{ marginLeft: 3 }}
              type="primary"
              shape="round"
              onClick={changeMonitorStatus}
            >
              Włącz
            </Button>
          )}

          <Button
            style={{ marginLeft: 3 }}
            type="danger"
            shape="round"
            onClick={deleteMonitor}
          >
            Usuń
          </Button>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default ManageMonitor;
