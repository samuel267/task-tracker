import TaskTable from "../components/tasks/table";
import { CreateTask } from "../components/tasks/actionButtons";
import { TaskResponse } from "../lib/definitions";

export default async function Page() {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={` text-2xl`}>Tasks</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <CreateTask innerText="Add Task" />
      </div>
      <TaskTable />
      <div className="mt-5 flex w-full justify-center"></div>
    </div>
  );
}
