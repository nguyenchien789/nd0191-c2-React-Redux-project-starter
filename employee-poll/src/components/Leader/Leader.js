import React from "react";
import { useEffect, useState } from "react";
import { store } from "../../state/store/store.js";
import { Avatar, List } from "antd";

const Leader = () => {
  var users = store.getState().users;
  const [data, setData] = useState([]);
  useEffect(() => {
    const array = Object.keys(users).map((key) => users[key]);
    const data = array.sort((a, b) => Object.keys(b.answers).length - Object.keys(a.answers).length);
    setData(data);
  }, []);
  return (
    <List
    itemLayout="horizontal"
    dataSource={data}
    renderItem={(item, index) => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src={item.avatarURL} />}
          title={item.name}
          description={<span>{Object.keys(item.answers).length} Answers, {Object.keys(item.questions).length} Questions</span>}
        />
      </List.Item>
    )}
  />)
};

export default Leader;