import { Badge, Button, Table, Tag } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { changeUserMonitorStatus, deleteUserMonitor } from "../store/monitor";

const ExpandedTableAdmin = (params) => {
  const dispatch = useDispatch();

  const changeMonitorStatus = (id) => {
    dispatch(changeUserMonitorStatus({ monitorID: id }));
  };

  const deleteMonitor = (id) => {
    dispatch(deleteUserMonitor({ monitorID: id }));
  };

  const columns = [
    {
      title: "Data Dodania",
      dataIndex: "date",
      key: "date",
      className: "tableHeader",
    },
    {
      title: "Nazwa śledzenia",
      dataIndex: "name",
      key: "name",
      className: "tableHeader",
    },
    {
      title: "Status",
      dataIndex: "state",
      key: "state",
      className: "tableHeader",
    },
    {
      title: "Aktywne serwisy",
      dataIndex: "services",
      key: "services",
      className: "tableHeader",
    },
    {
      title: "Czas odświeżania",
      dataIndex: "upgradeNum",
      key: "upgradeNum",
      className: "tableHeader",
    },
    {
      title: "Akcje",
      className: "tableHeader",
      dataIndex: "operation",
      key: "operation",
    },
  ];

  const data = [];
  params.record.childrenData.forEach((element) => {
    data.push({
      key: element._id,
      date: element.createTime,
      name: element.monitorName,
      state: (
        <React.Fragment>
          <span>
            <Badge status={element.monitorStatus ? "success" : "error"} />
            {element.monitorStatus ? "Aktywny" : "Nieaktywny"}
          </span>
        </React.Fragment>
      ),
      services: (
        <React.Fragment>
          <Tag
            color={element.monitorAllegro ? "green" : "volcano"}
            key="Allegro"
          >
            Allegro
          </Tag>
          <Tag color={element.monitorEBay ? "green" : "volcano"} key="eBay">
            eBay
          </Tag>
        </React.Fragment>
      ),
      upgradeNum: element.monitorTimeMinutes + " min.",
      operation: (
        <React.Fragment>
          <Button
            type="default"
            shape="round"
            onClick={() => changeMonitorStatus(element._id)}
            danger={element.monitorStatus ? true : false}
          >
            {element.monitorStatus ? "Zatrzymaj" : "Uruchom"}
          </Button>
          <Button
            type="default"
            shape="round"
            style={{ marginLeft: "5px" }}
            danger={true}
            onClick={() => deleteMonitor(element._id)}
          >
            Usuń
          </Button>
        </React.Fragment>
      ),
      className: "tableData",
    });
  });

  return (
    <Table
      className="searchingTable"
      columns={columns}
      dataSource={data}
      pagination={false}
      style={{ marginBottom: "10px" }}
    />
  );
};

export default ExpandedTableAdmin;
