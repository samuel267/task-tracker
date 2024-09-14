import { sql } from '@vercel/postgres';
import { TaskResponse } from './definitions';
import { axiosGet } from './utils';


export async function fetchTasks(): Promise<TaskResponse[]> {
    try {
        console.log('Fetching task data...');
        await new Promise((resolve) => setTimeout(resolve, 3000));

        const apiResponse: TaskResponse[] = await axiosGet('task');

        // Convert ApiResponse to TaskResponse[]
        const taskResponses: TaskResponse[] = apiResponse.map((item: TaskResponse) => item);

        console.log('Data fetch completed after 3 seconds.');

        return taskResponses;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch task data.');
    }
}