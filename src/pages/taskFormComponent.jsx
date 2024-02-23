import React, { useId, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, updateTask, taskDetail } from '../reducers/slice';
const TaskForm = ({ onSubmit }) => {
    const id = useId();
    const selectedTask = useSelector(state => state.tasks.selectedTask);
    const initialData = selectedTask || { id, title: "", description: "", dueDate: "", completed: false };
    const [taskData, setTaskData] = useState({ ...initialData });
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const validateForm = () => {
        const errors = {};
        if (!taskData.title.trim()) {
            errors.title = 'Title is required';
        }
        if (!taskData.description.trim()) {
            errors.description = 'Description is required';
        }
        if (!taskData.dueDate) {
            errors.dueDate = 'Due date is required';
        } else if (new Date(taskData.dueDate) < new Date()) {
            errors.dueDate = 'Due date must be in the future';
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const handleSubmit = event => {
        event.preventDefault();
        if (validateForm()) {
            console.log(111)
            if (selectedTask) {
                dispatch(updateTask({ ...taskData }));
            } else {
                dispatch(addTask({ ...taskData }));
            }
            dispatch(taskDetail(null));
            onSubmit();
        }
    };
    return (
        <form className='p-5' onSubmit={handleSubmit}>
            <div className="form-group m-2">
                <label>Title</label>
                <input
                    type="text"
                    className={`form-control ${errors.title && 'is-invalid'}`}
                    placeholder="Title"
                    value={taskData.title}
                    onChange={e => setTaskData(prev => ({ ...prev, title: e.target.value }))}
                />
                {errors.title && <div className="invalid-feedback">{errors.title}</div>}
            </div>
            <div className="form-group m-2">
                <label>Description</label>
                <textarea
                    placeholder="Description"
                    className={`form-control ${errors.description && 'is-invalid'}`}
                    value={taskData.description}
                    onChange={e => setTaskData(prev => ({ ...prev, description: e.target.value }))}
                ></textarea>
                {errors.description && <div className="invalid-feedback">{errors.description}</div>}
            </div>
            <div className="form-group m-2">
                <label>Due Date</label>
                <input
                    type="date"
                    className={`form-control ${errors.dueDate && 'is-invalid'}`}
                    value={taskData.dueDate}
                    onChange={e => setTaskData(prev => ({ ...prev, dueDate: e.target.value }))}
                />
                {errors.dueDate && <div className="invalid-feedback">{errors.dueDate}</div>}
            </div>
            <button className='btn btn-success btn-sm m-2' type="submit">{selectedTask ? 'Update Task' : 'Add Task'}</button>
            <button className='btn btn-danger btn-sm m-2' onClick={() => { onSubmit(); dispatch(taskDetail(null)); }} type="button">Cancel</button>
        </form>
    );
};

export default TaskForm;
