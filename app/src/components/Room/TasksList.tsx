import React, { useState } from 'react';
import { Button, Form, ListGroup } from 'react-bootstrap';

import { Task } from '../../types';

type TasksListProps = {
  tasks: Task[];
  handleAddTask: (taskName: string) => void;
};

const TasksList: React.FC<TasksListProps> = ({ tasks, handleAddTask }) => {
  const [taskName, setTaskName] = useState('');

  const onAddTask = () => {
    handleAddTask(taskName);
    setTaskName('');
  };

  return (
    <>
      <Form>
        <Form.Group>
          <Form.Control
            type="text"
            value={taskName}
            onChange={({ target: { value } }) => setTaskName(value)}
          />
          <Button type="button" onClick={onAddTask}>
            Add task
          </Button>
        </Form.Group>
      </Form>
      <ListGroup>
        {tasks.map((task) => (
          <ListGroup.Item key={task._id}>{task.name}</ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default TasksList;
