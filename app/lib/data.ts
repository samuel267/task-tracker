import { sql } from '@vercel/postgres';
import { TaskResponse } from './definitions';
import { axiosGet } from './utils';


export async function fetchTasks(): Promise<TaskResponse[]> {
    try {
        // Artificially delay a response for demo purposes.
        // Don't do this in production :)

        console.log('Fetching task data...');
        await new Promise((resolve) => setTimeout(resolve, 3000));

        const data: TaskResponse[] = await axiosGet('task')

        console.log('Data fetch completed after 3 seconds.');

        return data;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch task data.');
    }
}