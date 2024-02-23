import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    list: [],
    selectedTask: null,
    isFormOpen: false,
    isOpenDetails: false,
    selectedId: null
};
const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask(state, action) {
            console.log(action.payload)
            state.list.push(action.payload);
        },
        updateTask(state, action) {
            const { id, title, description, dueDate } = action.payload;
            const taskToUpdate = state.list.find(task => task.id === id);
            if (taskToUpdate) {
                taskToUpdate.title = title;
                taskToUpdate.description = description;
                taskToUpdate.dueDate = dueDate;
            }
        },
        deleteTask(state, action) {
            console.log(action.payload)
            state.list = state.list.filter(task => task.id !== action.payload);
        },
        taskDetail(state, action) {
            console.log(action.payload)
            state.selectedTask = action.payload;
        },
        toggleTaskStatus(state, action) {
            const { id, completed } = action.payload;
            const taskToUpdate = state.list.find(task => task.id === id);
            if (taskToUpdate) {
                taskToUpdate.completed = completed;
            }
        },
    },
});
export const { addTask, updateTask, deleteTask, toggleTaskStatus, taskDetail } = tasksSlice.actions;
export default tasksSlice.reducer;