import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/taskSlice';
import classes from './Task.module.css';

export default function TaskForm({ onCancel }) {
  const [text, setText] = useState('');
  const [est, setEst] = useState(1);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(addTask({ text, est }));
      onCancel();
    }
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <input
        type="text"
        className={classes.input}
        placeholder="What are you working on?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        autoFocus
      />
      <label className={classes.label}>Est Pomodoros</label>
      <input
        type="number"
        className={classes.numInput}
        value={est}
        min="1"
        onChange={(e) => setEst(e.target.value)}
      />
      <div className={classes.buttons}>
        <button type="button" className={classes.cancelButton} onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className={classes.saveButton}>
          Save
        </button>
      </div>
    </form>
  );
}