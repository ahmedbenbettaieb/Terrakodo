import React from "react";

import { Input, Button, Form } from "antd";
import toast from "react-hot-toast";
import { axiosInstance } from "../../axios/axiosInstance";
import { useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    console.log(values);
    try {
      // Use the axios instance to make a POST request
      const response = await axiosInstance.post("/auth/login", values);
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.access_token);
        navigate("/home");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };
  return (
    <div className="container-sm">
      <div className="row justify-content-center">
        <div className="col-sm-12 col-md-12 col-lg-6">
          <Form name="registration" onFinish={onFinish} layout="vertical">
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

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="col-sm-6 col-form-label"
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
