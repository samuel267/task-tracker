"use client";

import TaskStatus from "./status";
import { useDispatch, useSelector } from "react-redux";
import { DeleteTask, UpdateTask } from "./actionButtons";

import { TaskResponse } from "@/app/lib/definitions";
import { RootState } from "@/app/store/store";
import { useEffect } from "react";
import { fetchTasks } from "@/app/lib/data";
import {
  fetchTasksFailure,
  fetchTasksRequest,
  fetchTasksSuccess,
} from "@/app/store/taskSlice";

export default async function TaskTable() {
  const tasks: TaskResponse[] = useSelector(
    (state: RootState) => state.tasks?.list || []
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTasksAndSetState = async () => {
      try {
        const tasks: TaskResponse[] = await fetchTasks();
        dispatch(fetchTasksSuccess(tasks));
      } catch (error) {
        if (error instanceof Error) {
          dispatch(fetchTasksFailure(error.message));
        } else {
          console.error("Unexpected error:", error);
          dispatch(fetchTasksFailure("An unexpected error occurred"));
        }
      }
    };

    fetchTasksAndSetState();
  }, [dispatch]);
  //   const tasks: TaskResponse[] = [
  //     {
  //       id: "1",
  //       title: "Task 1",
  //       description: "Description",
  //       status: "pending",
  //       dueDate: "20-07-2024",
  //     },
  //   ];

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {tasks?.map((task) => (
              <div
                key={task.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{task.title}</p>
                    </div>
                    <p className="text-sm text-gray-500">{task.description}</p>
                    <p className="text-sm text-gray-500">{task.dueDate}</p>
                  </div>
                  <TaskStatus status={task.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div className="flex justify-end gap-2">
                    <UpdateTask id={task.id} />
                    <DeleteTask id={task.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Title
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Description
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Due Date
                </th>

                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {tasks?.map((task) => (
                <tr
                  key={task.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{task.title}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {task.description}
                  </td>

                  <td className="whitespace-nowrap px-3 py-3">
                    <TaskStatus status={task.status} />
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <TaskStatus status={task.dueDate} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateTask id={task.id} />
                      <DeleteTask id={task.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
