// Task data type definition

export type TaskResponse = {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    status: 'pending' | 'in progress' | 'completed';
};