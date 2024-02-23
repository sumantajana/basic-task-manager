import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, toggleTaskStatus, taskDetail } from '../reducers/slice';

const TaskItem = ({ openForm, task }) => {
    const dispatch = useDispatch();
    const handleDelete = () => {
        dispatch(deleteTask(task.id));
    };
    const handleEdit = () => {
        dispatch(taskDetail(task));
        openForm();
    };
    const handleToggleStatus = () => {
        dispatch(toggleTaskStatus({ id: task.id, completed: !task.completed }));
    };
    return <div className={`task ${task.completed ? 'completed' : ''} col-4`}>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <p>Due Date: {task.dueDate}</p>
        <p>Status: {task.completed ? 'Completed' : 'Incomplete'}</p>
        <div className='d-flex'>
            <button onClick={handleEdit} className="btn btn-sm btn-primary me-1">Edit</button>
            <button onClick={handleDelete} className="btn btn-sm btn-danger me-1">
                Delete
            </button>
            <button onClick={handleToggleStatus} className="btn btn-sm btn-primary">
                {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
            </button>
        </div>
    </div>
};

export default TaskItem;
