import React from 'react'
import { axiosInstance } from '../../axios/axiosInstance';
import { message, Input, DatePicker, Button, Form, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AddTask()
{

    const navigate=useNavigate();
    const onFinish = async (values: any) => {
    try {

        const formattedDueDate = new Date(values.due_date).toISOString().split('T')[0];

        // Update the values with the formatted due_date
        values.due_date = formattedDueDate;


      const response = await axios.post('http://127.0.0.1:8000/api/task/create', values, {
        headers: {
          // Replace 'YOUR_TOKEN_HERE' with the actual token
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log(response.data)
      if(response.data.success){
        message.success('Task created successfully');
        navigate(-1);
      }

      // Display success message
    } catch (error) {
      // Display error message
      console.log("error",error)
      message.error('Failed to create task');
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };


  const validatePriority = (rule: any, value: any) => {
    const priority = parseInt(value, 10);
    if (isNaN(priority) || priority < 1 || priority > 5) {
      return Promise.reject('Priority must be a number between 1 and 5');
    }
    return Promise.resolve();
  };
  return (

    <Card>
        <Form
    name="createTask"
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    layout='vertical'
  >
    <Form.Item
      label="Title"
      name="title"
      rules={[{ required: true, message: 'Please enter the title' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Description"
      name="description"
      rules={[{ required: true, message: 'Please enter the description' }]}
    >
      <Input.TextArea />
    </Form.Item>

  <Form.Item
        label="Priority"
        name="priority"
        rules={[
          { required: true, message: 'Please enter the priority' },
          { validator: validatePriority }
        ]}
      >
        <Input type="number" />
      </Form.Item>

    <Form.Item
      label="Due Date"
      name="due_date"
      rules={[{ required: true, message: 'Please select the due date' }]}
    >
      <DatePicker />
    </Form.Item>

    <Form.Item>
      <Button type="primary" htmlType="submit">
        Create Task
      </Button>
    </Form.Item>
  </Form>
  </Card>
    
  );
};

