'use server'

// This file contains action that will be used to update Tasks
import { TaskResponse } from './definitions';
import { axiosDelete, axiosGet, axiosPost, axiosPut } from './utils';

export async function createTask(taskData: Omit<TaskResponse, 'id'>) {

    try {
        const data = await axiosPost('tasks', taskData)
        // console.log(data)
        // redirect('/tasks');

        return data;
    } catch (error) {
        return {
            message: 'Database Error: Failed to Create Task.',
        };
    }


}


export async function updateTask(id: string, taskData: Omit<TaskResponse, 'id'>) {


    try {
        const data = await axiosPut(`tasks/${id}`, taskData)
        return data;

    } catch (error) {
        return { message: 'Database Error: Failed to Update Task.' };
    }

    // redirect('/tasks');
}

export async function getTaskById(id: string) {

    try {
        const data = await axiosGet(`tasks/${id}`)

        return data
    } catch (error) {
        return { message: 'Database Error: Failed to Delete Task' };
    }
}

export async function deleteTask(id: string) {

    try {
        const data = await axiosDelete(`tasks/${id}`)

        return { message: 'Deleted Task', data };
    } catch (error) {
        return { message: 'Database Error: Failed to Delete Task' };
    }
}