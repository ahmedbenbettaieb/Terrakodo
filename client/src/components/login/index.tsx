import { Input, Button, Form } from 'antd';
import React from 'react'
import toast from 'react-hot-toast';
import { axiosInstance } from '../../axios/axiosInstance';
import { useNavigate } from 'react-router-dom';

export  function Login() {
  const navigate=useNavigate();

  const onFinish = async (values: any) => {
    console.log(values)
    try {
      // Use the axios instance to make a POST request
      const response = await axiosInstance.post("/auth/login", values);
      if(response.data.success){
        toast.success(response.data.message);
        localStorage.setItem('token',response.data.access_token);
        navigate("/home")
      }
      else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error("something went wrong")
    }
  };
  return (
    <div style={{backgroundColor:"white"}}>
      <Form
        name="registration"
        onFinish={onFinish}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        

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

        
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
