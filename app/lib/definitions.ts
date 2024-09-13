// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// export type Task = {
//     // id: string;
//     title: string;
//     description: string;
//     dueDate: string;
//     // In TypeScript, this is called a string union type.
//     // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
//     status: 'pending' | 'in progress' | 'completed';
// };

export type TaskResponse = {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    status: 'pending' | 'in progress' | 'completed';
};