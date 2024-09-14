import { Suspense } from "react";
import TaskTable from "../components/tasks/table";
import { CreateTask } from "../components/tasks/actionButtons";
import { fetchTasks } from "../lib/data";
import { TaskResponse } from "../lib/definitions";

export default async function Page() {
  const tasks: TaskResponse[] = await fetchTasks();
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={` text-2xl`}>Tasks</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <CreateTask innerText="Add Task" />
      </div>
      <TaskTable tasks={tasks} />
      <div className="mt-5 flex w-full justify-center"></div>
    </div>
  );
}
