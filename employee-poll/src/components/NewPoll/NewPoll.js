import React from "react";
import { Button, Card, Form, Input } from "antd";
import { store } from "../../state/store/store.js";
import { addQuestion } from "../../state/action/action.js";
import { useNavigate } from "react-router-dom";
import { _saveQuestion } from "../../_DATA.js";

const NewPoll = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    var user = store.getState().isLogged;
    const question = await _saveQuestion({
      optionOneText: values.optionOne,
      optionTwoText: values.optionTwo,
      author: user.id,
    });
    store.dispatch(addQuestion(question));
    if (user) {
      navigate("/");
    }
  };
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card title="Would You Rather" style={{ width: "40vw" }}>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="optionOne"
            label="Option one"
            rules={[
              { required: true, message: "Please input your option one!" },
            ]}
          >
            <Input placeholder="Option one" />
          </Form.Item>
          <Form.Item
            name="optionTwo"
            label="Option two"
            rules={[
              { required: true, message: "Please input your option two!" },
            ]}
          >
            <Input placeholder="Option two" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "100%" }}
              className="login-form-button"
            >
              Add
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default NewPoll;
