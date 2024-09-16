"use client";

import TaskStatus from "./status";
import { useDispatch, useSelector } from "react-redux";
import { DeleteTask, UpdateTask } from "./actionButtons";

import { TaskResponse } from "@/app/lib/definitions";
import { AppDispatch, RootState } from "@/app/store/store";
import { useEffect } from "react";
import { fetchTasks } from "@/app/store/taskSlice";
import {
  ArrowPathIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { Toaster } from "react-hot-toast";

export default function TaskTable() {
  const dispatch = useDispatch<AppDispatch>();

  const { list, loading, error } = useSelector(
    (state: RootState) => state.tasks
  );

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <ArrowPathIcon className="animate-spin h-12 w-12 text-blue-500" />
        <p className="text-lg text-blue-500 mt-4">Loading tasks...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <ExclamationTriangleIcon className="h-12 w-12 text-red-500" />
        <p className="text-lg text-red-500 mt-4">Error loading tasks</p>
      </div>
    );

  if (list.length === 0)
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <ExclamationTriangleIcon className="h-12 w-12 text-yellow-500" />
        <p className="text-lg text-gray-800 mt-4">
          No tasks available. Add a new task
        </p>
      </div>
    );

  return (
    <>
      <Toaster />

      <div className="mt-6 flow-root">
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
            <div className="md:hidden">
              {list?.map((task) => (
                <div
                  key={task.id}
                  className="mb-2 w-full rounded-md bg-white p-4"
                >
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <div className="mb-2 flex items-center">
                        <p>{task.title}</p>
                      </div>
                      <p className="text-sm text-gray-500">
                        {task.description}
                      </p>
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
                {list?.map((task) => (
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
                      {task.dueDate}
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
    </>
  );
}
