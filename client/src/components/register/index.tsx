import React from "react";
import { axiosInstance } from "../../axios/axiosInstance";
import { Form, Input, Button } from "antd";
import toast from "react-hot-toast";

export function Register() {
  const onFinish = async (values: any) => {
    console.log(values)
    try {
      // Use the axios instance to make a POST request
      const response = await axiosInstance.post("/auth/register", values);
      if(response.data.success){
        toast.success(response.data.message);
      }
      else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error("something went wrong")
    }
  };
  return (
    <div>
      <Form
        name="registration"
        onFinish={onFinish}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item
          label="Username"
          name="name"
          rules={[{ required: true, message: "Please input your username!" }]}
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
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password_confirmation"
          rules={[{ required: true, message: "Please confirm your password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
