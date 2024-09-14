// This file contains action that will be used to update Tasks
import { redirect } from 'next/navigation';
import { TaskResponse } from './definitions';
import { axiosPost, axiosPut } from './utils';







export async function createTask(taskData: Omit<TaskResponse, 'id'>) {

    try {
        const data = await axiosPost('task', taskData)
        // console.log(data)
        // redirect('/tasks');

        return data;
    } catch (error) {
        return {
            message: 'Database Error: Failed to Create Task.',
        };
    }


}


// ...

export async function updateTask(id: string, taskData: Omit<TaskResponse, 'id'>) {


    try {
        const data = await axiosPut(`task/${id}`, taskData)
        return data;

    } catch (error) {
        return { message: 'Database Error: Failed to Update Task.' };
    }

    // redirect('/tasks');
}

export async function deleteTask(id: string) {
    // throw new Error('Failed to Delete Invoice');

    // Unreachable code block
    try {

        return { message: 'Deleted Task' };
    } catch (error) {
        return { message: 'Database Error: Failed to Delete Task' };
    }
}