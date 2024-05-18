import React from "react";
import { useEffect, useState } from "react";
import { store } from "../../state/store/store.js";
import { Switch, List } from "antd";
import { Link } from "react-router-dom";

const Dashboard = () => {
  var userId = store.getState().isLogged.id;
  const [isAnswered, setIsAnswered] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    const questions = store.getState().questions;
    const user = store.getState().users[userId];
    const array = Object.keys(questions).map((key) => questions[key]);
    const answer = Object.keys(user.answers).map((key) => key);
    let data;
    if (isAnswered) {
      data = array.filter((item) => answer.includes(item.id));
    } else {
      data = array.filter((item) => !answer.includes(item.id));
    }
    setData(data);
  }, [isAnswered]);

  const onChange = (checked) => {
    setIsAnswered(checked);
  };

  return (
    <>
      <div>
        <Switch
          style={{ marginRight: "20px" }}
          defaultChecked
          onChange={onChange}
        />
        {isAnswered ? "Answered Questions" : "Unanswered Questions"}
      </div>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              title={
                <Link to={`/question/${item.id}`}>
                  Would you rather {item.optionOne.text} or{" "}
                  {item.optionTwo.text}
                </Link>
              }
              description={item.author}
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default Dashboard;
