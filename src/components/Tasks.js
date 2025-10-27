import { useState } from 'react';
import { useSelector } from 'react-redux';
import classes from './Tasks.module.css';
import Icon from './Icon';
import TaskForm from './Task';
import TaskItem from './Item';

export default function Tasks() {
  const [showForm, setShowForm] = useState(false);
  const { tasks, activeTaskId } = useSelector((state) => state.tasks);

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h3>Tasks</h3>
      </div>
      <hr className={classes.hr} />

      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} isActive={task.id === activeTaskId} />
      ))}

      {showForm && <TaskForm onCancel={() => setShowForm(false)} />}

      <button className={classes.addButton} onClick={() => setShowForm(true)}>
        <Icon name="add_circle" />
        <span>Add Task</span>
      </button>
    </div>
  );
}