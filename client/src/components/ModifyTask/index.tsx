import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../axios/axiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Input, DatePicker, Button, Form, message, Select } from "antd";
import axios from "axios";
import moment from "moment";

interface Task {
  id: number;
  title: string;
  description: string;
  priority: number;
  due_date: string;
  status: string;
}

export default function ModifyTask() {
  const [tasks, setTasks] = useState<Task | null>(null); // Use null for initial value
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm(); // Initialize form instance

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`task/single-task/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to fetch data only once

  const onFinish = async (values: any) => {
    try {
      const formattedDueDate = new Date(values.due_date)
        .toISOString()
        .split("T")[0];
      values.due_date = formattedDueDate;

      const response = await axiosInstance.post(`task/update/${id}`, values, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response.data);
      if (response.data.success) {
        message.success("Task created successfully");
        navigate(-1);
      }
    } catch (error) {
      console.log("error", error);
      message.error("Failed to create task");
    }
  };

  const validatePriority = (rule: any, value: any) => {
    const priority = parseInt(value, 10);
    if (isNaN(priority) || priority < 1 || priority > 5) {
      return Promise.reject("Priority must be a number between 1 and 5");
    }
    return Promise.resolve();
  };

  useEffect(() => {
    if (tasks) {
      // Set form fields values when tasks is available
      form.setFieldsValue({
        title: tasks.title,
        description: tasks.description,
        priority: tasks.priority,
        due_date: tasks.due_date ? moment(tasks.due_date) : undefined,
      });
    }
  }, [tasks]);

  return (
    <>
      <Card>
        <Form
          form={form} // Pass the form instance to the Form component
          name="createTask"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item label="Title" name="title">
            <Input />
          </Form.Item>
          <Form.Item label="Status" name="status">
            <Select>
              <Select.Option value="completed">completed</Select.Option>
              <Select.Option value="not_started">not Started</Select.Option>
              <Select.Option value="pending">pending</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            label="Priority"
            name="priority"
            rules={[{ validator: validatePriority }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item label="Due Date" name="due_date">
            <DatePicker />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update Task
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
}
