import React from "react";
import { axiosInstance } from "../../axios/axiosInstance";
import { Form, Input, Button, message } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./index.css"


export function Register() {
  const onFinish = async (values: any) => {
    console.log(values);
    try {
      // Use the axios instance to make a POST request
      const response = await axiosInstance.post("/auth/register", values);
      if (response.data.success) {
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
    message.error("something went wrong");
    }
  };
  return (
    <div className="container-sm">
      <div className="row justify-content-center">
        <div className="col-sm-12 col-md-12 col-lg-6">
          <Form name="registration" onFinish={onFinish} layout="vertical">
            <Form.Item
              label="Username"
              name="name"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
              className="col-sm-6 col-form-label"
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Invalid email format" },
              ]}
              className="col-sm-6 col-form-label"
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
              className="col-sm-6 col-form-label"
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              name="password_confirmation"
              rules={[
                { required: true, message: "Please confirm your password!" },
              ]}
              className="col-sm-6 col-form-label"
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="col-sm-6 col-form-label"
              >
                Register
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
