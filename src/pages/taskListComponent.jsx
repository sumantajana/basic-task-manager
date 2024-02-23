import React from 'react';
import { useSelector } from 'react-redux';
import TaskItem from './taskItemComponent';
const TaskList = ({ openForm, isIncludeInactive }) => {
    const tasks = useSelector(state => state.tasks.list);
    const dataList = isIncludeInactive ? tasks : tasks.filter(dt => dt.completed);
    return (
        <div>
            <div className='row'>
                {dataList.map(task => (
                    <TaskItem key={task.id} task={task} openForm={openForm} />
                ))}
            </div>
        </div>
    );
};

export default TaskList;

