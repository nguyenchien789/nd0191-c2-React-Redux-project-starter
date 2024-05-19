import React from "react";
import { useEffect, useState } from "react";
import { Switch, List } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Dashboard = ({ array, answer }) => {
  const [isAnswered, setIsAnswered] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
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
        <Switch style={{ marginRight: "20px" }} onChange={onChange} />
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

const mapStateToProps = ({ isLogged, users, questions }) => {
  const user = users[isLogged.id];
  const array = Object.keys(questions)
    .map((key) => questions[key])
    .sort((a, b) => b.timestamp - a.timestamp);
  const answer = Object.keys(user.answers).map((key) => key);

  console.log(isLogged);
  console.log(users);
  console.log(questions);
  return {
    array: array,
    answer: answer,
  };
};

export default connect(mapStateToProps)(Dashboard);
