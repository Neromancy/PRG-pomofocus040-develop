import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleTask, deleteTask, setActiveTask } from '../redux/taskSlice';
import classes from './TaskItem.module.css';
import Icon from './Icon';
import clsx from 'clsx';

export default function TaskItem({ task, isActive }) {
  const dispatch = useDispatch();

  return (
    <div className={clsx(classes.item, isActive && classes.active)}>
      <div className={classes.left} onClick={() => dispatch(setActiveTask(task.id))}>
        <button
          className={classes.checkButton}
          onClick={(e) => {
            e.stopPropagation();
            dispatch(toggleTask(task.id));
          }}
        >
          <Icon name="check_circle" />
        </button>
        <span className={clsx(classes.text, task.completed && classes.completed)}>
          {task.text}
        </span>
      </div>
      <div className={classes.right}>
        <span className={classes.pomodoros}>
          {task.act}
          <span className={classes.pomoSeparator}> / </span>
          {task.est}
        </span>
        <button className={classes.deleteButton} onClick={() => dispatch(deleteTask(task.id))}>
          <Icon name="delete_outline" />
        </button>
      </div>
    </div>
  );
}