import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../axios/axiosInstance'
import { Space, Button, Table, message } from 'antd';
import { useNavigate } from 'react-router-dom';

interface Task {
  id: number;
  title: string;
  description: string;
  priority: number;
  due_date: string;
  userID: number;
  created_at: string;
  updated_at: string;
  status: string;
}




export default function AllTasks() {

  const [tasks, setTasks] = useState<Task[]>([]);
  const navigate=useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('task/my-tasks', {
          headers: {
            'Authorization': `Bearer  ${localStorage.getItem('token')}`
          }
        });

        // Update state with fetched tasks
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    // Call the async function to fetch data
    fetchData();
  }, []); 

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
    },
    {
      title: 'Due Date',
      dataIndex: 'due_date',
      key: 'due_date',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: any, record: Task) => (
        <Space size="middle">
          <Button onClick={() => handleModify(record.id)}>Modify</Button>
          <Button onClick={() => handleDelete(record.id)} danger>Delete</Button>
        </Space>
      ),
    },
  ];

  // Function to handle modify action
  const handleModify = (id: number) => {
    
    console.log("record",id);
    navigate(`/modify-task/${id}`);

  };

  // Function to handle delete action
  const handleDelete = async (id: number) => {
    try {
      const response = await axiosInstance.delete(`/task/delete/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
  
      if (response.data.success) {
        message.success('Deleted with success');
        
        // Remove the deleted task from the tasks array
        setTasks(prevTasks =>
          prevTasks.filter(task => task.id !== id)
        );
      } else {
        message.error('Failed to delete task');
      }
    } catch (error) {
      console.log("Error:", error);
      message.error('Something went wrong');
    }
  };
  
  const handleNavigate=()=>{

    navigate("/add-task")

  }

  function LogOut() {
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <div>
    <Table dataSource={tasks} columns={columns} />
    <div style={{ marginBottom: '10px' }}>
        <Button type='primary' onClick={handleNavigate}>Add a new task</Button>
      </div>
      <div>
        <Button type='primary' onClick={LogOut}>Logout</Button>
      </div>

    </div>
    )
}
