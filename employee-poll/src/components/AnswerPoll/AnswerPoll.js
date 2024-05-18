import React from "react";
import { Avatar, Radio } from "antd";
import { store } from "../../state/store/store.js";
import { useParams } from "react-router-dom";
import { _saveQuestionAnswer } from "../../_DATA.js";
import { updateQuestions, updateUsers } from "../../state/action/action.js";
import { useState } from "react";

const AnswerPoll = () => {
  const param = useParams();
  const [question, setQuestion] = useState(
    store.getState().questions[param.id]
  );
  const user = store.getState().users[question.author];
  const userId = store.getState().isLogged.id;
  const [value, setValue] = useState(
    store.getState().users[userId].answers[param.id.toString()]
  );
  // const [ optionOneRatio, setOptionOneRatio] = useState(0);

  const options = [
    { label: question.optionOne.text, value: "optionOne" },
    { label: question.optionTwo.text, value: "optionTwo" },
  ];

  const onChange = async ({ target: { value } }) => {
    let users = store.getState().users;
    let questions = store.getState().questions;
    let authedUser = userId;
    let qid = param.id;
    let answer = value;
    let otherAnswer = answer === "optionOne" ? "optionTwo" : "optionOne";
    users = {
      ...users,
      [authedUser]: {
        ...users[authedUser],
        answers: {
          ...users[authedUser].answers,
          [qid]: answer,
        },
      },
    };
    questions = {
      ...questions,
      [qid]: {
        ...questions[qid],
        [answer]: {
          ...questions[qid][answer],
          votes: questions[qid][answer].votes.concat([authedUser]),
        },
        [otherAnswer]: {
          ...questions[qid][answer],
          votes: questions[qid][answer].votes.map((x) => x !== authedUser),
        },
      },
    };
    store.dispatch(updateUsers(users));
    store.dispatch(updateQuestions(questions));
    setValue(store.getState().users[userId].answers[param.id.toString()]);
    setQuestion(store.getState().questions[param.id]);
  };
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Avatar size={100} src={user.avatarURL} />
        </div>
        <h3  style={{ display: "flex", justifyContent: "center" }}>
          Would You Rather {question.optionOne.text} or{" "}
          {question.optionTwo.text} ?
        </h3>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Radio.Group
            options={options}
            onChange={onChange}
            optionType="button"
            buttonStyle="solid"
            value={value}
          />
        </div>
        {value != undefined && (
          <div style={{ marginTop: "20px" }}>
            There's {Object.keys(question.optionOne.votes).length} (
            {(Object.keys(question.optionOne.votes).length /
              (Object.keys(question.optionOne.votes).length +
                Object.keys(question.optionTwo.votes).length)) *
              100}
            %) user select <b>{question.optionOne.text}</b> and{" "}
            {Object.keys(question.optionTwo.votes).length} (
            {(Object.keys(question.optionTwo.votes).length /
              (Object.keys(question.optionOne.votes).length +
                Object.keys(question.optionTwo.votes).length)) *
              100}
            %) user select <b>{question.optionTwo.text}</b>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnswerPoll;
