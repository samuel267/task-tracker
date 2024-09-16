import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { TaskResponse } from '../lib/definitions';



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

// Define an async thunk to fetch tasks from the `/api/tasks` endpoint
export const fetchTasks = createAsyncThunk<TaskResponse[], void, { rejectValue: string }>(
    'tasks/fetchTasks',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('/api/tasks', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            const tasks: TaskResponse[] = data.tasks

            if (!response.ok) {
                return rejectWithValue('Failed to fetch tasks');
            }


            return tasks; // Returning the task list from the API response
        } catch (error: unknown) {
            if (error instanceof Error) {
                return rejectWithValue(error.message); // Return the error message if it's an Error
            } else {
                return rejectWithValue('An unknown error occurred');
            }
        }
    }
);

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        // Handle the loading state when fetching tasks
        builder.addCase(fetchTasks.pending, (state: TasksState) => {
            state.loading = true;
            state.error = null;
        });

        // Handle success when tasks are fetched successfully
        builder.addCase(fetchTasks.fulfilled, (state: TasksState, action: PayloadAction<TaskResponse[]>) => {
            state.list = action.payload;
            state.loading = false;
        });

        // Handle failure if there's an error during the fetch
        builder.addCase(fetchTasks.rejected, (state: TasksState, action: PayloadAction<string | undefined>) => {
            state.error = action.payload || 'Unknown error';
            state.loading = false;
        });
    }
});

// export const { fetchTasksRequest, fetchTasksSuccess, fetchTasksFailure } = taskSlice.actions;
export default taskSlice.reducer;
