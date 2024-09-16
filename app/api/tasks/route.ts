import { createTask, getAllTasks } from "@/app/lib/airtable";
import { TaskResponse } from "@/app/lib/definitions";


export async function GET() {

    try {
        const tasks: TaskResponse[] = await getAllTasks()
        return new Response(JSON.stringify({ success: true, tasks }), {
            headers: { "Content-Type": "application/json" },
            status: 200,
        });
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
export async function POST(request: Request) {
    try {
        const task: Omit<TaskResponse, 'id'> = await request.json();
        const createdTask = await createTask(task);
        return new Response(JSON.stringify({ success: true, createdTask }), {
            headers: { "Content-Type": "application/json" },
            status: 200,
        });
    } catch (error: unknown) {
        console.error("Error creating data:", error);
        console.error("Error creating data:", error);

        // Safely handle the error type
        if (error instanceof Error) {
            return new Response(
                JSON.stringify({ success: false, error: error.message }),
                {
                    headers: { "Content-Type": "application/json" },
                    status: 500,
                }
            );
        } else {
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