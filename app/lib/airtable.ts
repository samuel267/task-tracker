// lib/airtable.ts
import Airtable from 'airtable';
import { TaskResponse } from './definitions';

// Initialize Airtable with your API key and base ID
const BASE_ID: string = process.env.AIRTABLE_BASE_ID as string
const API_KEY: string = process.env.AIRTABLE_API_KEY as string
const base = new Airtable({ apiKey: API_KEY }).base(BASE_ID);

// Define your table name
const TABLE_NAME = 'task-list';



// Function to get all tasks
export async function getAllTasks(): Promise<TaskResponse[]> {
    const records = await base(TABLE_NAME).select().all();
    return records.map((record) => ({
        id: record.id,
        ...record.fields,
    })) as TaskResponse[];
}

// Function to create a new task
export async function createTask(task: Omit<TaskResponse, 'id'>): Promise<TaskResponse> {
    const createdRecord = await base(TABLE_NAME).create([
        { fields: task }
    ]);
    return {
        id: createdRecord[0].id,
        ...createdRecord[0].fields,
    } as TaskResponse;
}

// Function to update a task
export async function updateTask(id: string, task: Partial<Omit<TaskResponse, 'id'>>): Promise<TaskResponse> {
    const updatedRecord = await base(TABLE_NAME).update([
        {
            id: id,
            fields: task,
        },
    ]);
    return {
        id: updatedRecord[0].id,
        ...updatedRecord[0].fields,
    } as TaskResponse;
}

// Function to delete a task
export async function deleteTask(id: string): Promise<{ id: string }> {
    const deletedRecord = await base(TABLE_NAME).destroy([id]);
    return {
        id: deletedRecord[0].id,
    };
}
