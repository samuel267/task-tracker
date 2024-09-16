import { deleteTask, getAllTasks, updateTask } from "@/app/lib/airtable";
import { TaskResponse } from "@/app/lib/definitions";

// Get a sigle task with Id
export async function GET(request: Request, { params }: { params: { id: string } }) {

    const { id } = params;
    try {
        console.log(id)
        const tasks = await getAllTasks();
        const task = tasks.find((task) => task.id === id);
        console.log(task)
        if (task) {
            return new Response(JSON.stringify({ success: true, task }), {
                headers: { "Content-Type": "application/json" },
                status: 200,
            });
        }
        else {
            return new Response(JSON.stringify({ message: 'Task not found' }), {
                headers: { "Content-Type": "application/json" },
                status: 404,
            });
        }

    } catch (error: unknown) {
        console.error("Failed to fetch task:", error);
        if (error instanceof Error) {
            return new Response(
                JSON.stringify({ success: false, error: error.message }),
                {
                    headers: { "Content-Type": "application/json" },
                    status: 500,
                }
            );}
            else {
                return new Response(
                    JSON.stringify({ success: false, error: `Unknown error occurred: ${error}` }),
                    {
                        headers: { "Content-Type": "application/json" },
                        status: 500,
                    }
                );
            }
    }
}

// Update a single task with id
export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const task: Partial<Omit<TaskResponse, 'id'>> = await request.json();
        const updatedTask = await updateTask(id, task);
        // console.log(updatedTask)

        return new Response(JSON.stringify({ success: true, updatedTask }), {
            headers: { "Content-Type": "application/json" },
            status: 200,
        });
    } catch (error: unknown) {
        console.error("Error updating task:", error);

        if (error instanceof Error) {
            return new Response(
                JSON.stringify({ success: false, error: error.message }),
                {
                    headers: { "Content-Type": "application/json" },
                    status: 500,
                }
            );}
            else {
                return new Response(
                    JSON.stringify({ success: false, error: `Unknown error occurred: ${error}` }),
                    {
                        headers: { "Content-Type": "application/json" },
                        status: 500,
                    }
                );
            }
    }
}

// Delete a single task with id
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    try {
        const result = await deleteTask(id);
        return new Response(JSON.stringify({ success: true, result }), {
            headers: { "Content-Type": "application/json" },
            status: 200,
        });
    } catch (error: unknown) {

        console.error("Error deleting task:", error);

        if (error instanceof Error) {
            return new Response(
                JSON.stringify({ success: false, error: error.message }),
                {
                    headers: { "Content-Type": "application/json" },
                    status: 500,
                }
            );}
            else {
                return new Response(
                    JSON.stringify({ success: false, error: `Unknown error occurred: ${error}` }),
                    {
                        headers: { "Content-Type": "application/json" },
                        status: 500,
                    }
                );
            }
    }
}