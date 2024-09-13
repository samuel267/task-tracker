import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TaskResponse } from '../lib/definitions';

// interface Task {
//     id: string;
//     title: string;
//     completed: boolean;
// }

interface TasksState {
    list: TaskResponse[]; // Define the list property as an array of Task objects
    loading: boolean;
    error: string | null;
}

const initialState: TasksState = {
    list: [], // Initializing list as an empty array
    loading: false,
    error: null,
};

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        fetchTasksRequest(state) {
            state.loading = true;
            state.error = null;
        },
        fetchTasksSuccess(state, action: PayloadAction<TaskResponse[]>) {
            state.list = action.payload;
            state.loading = false;
        },
        fetchTasksFailure(state, action: PayloadAction<string>) {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const { fetchTasksRequest, fetchTasksSuccess, fetchTasksFailure } = taskSlice.actions;
export default taskSlice.reducer;
