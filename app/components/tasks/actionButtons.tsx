"use client";

import {
  ArrowPathIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { deleteTask } from "@/app/lib/actions";
import { AppDispatch } from "@/app/store/store";
import { useDispatch } from "react-redux";
import { fetchTasks } from "@/app/store/taskSlice";
import { useState } from "react";
import { showToast } from "../utils/hotToast";
import { Toaster } from "react-hot-toast";

export function CreateTask({ innerText = "Add Data" }: { innerText: string }) {
  return (
    <Link
      href="/tasks/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">{innerText}</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateTask({ id }: { id: string }) {
  return (
    <Link
      href={`/tasks/create/${id}`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteTask({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  async function deleteTaskWithId() {
    setLoading(true);
    let data;

    setTimeout(async () => {
      data = await deleteTask(id);
      showToast({
        type: "info",
        message: "Task has been deleted",
        options: {
          duration: 4000,
          position: "top-center",
        },
      });
      setLoading(false);
      dispatch(fetchTasks());
    }, 2000);

    return data;
  }

  return (
    <>
      <Toaster />
      <form action={deleteTaskWithId}>
        <button
          data-testid="delete-task"
          disabled={loading}
          className="rounded-md border p-2 hover:bg-gray-100"
        >
          <span className="sr-only">Delete</span>
          {loading === false ? (
            <TrashIcon className="w-4" />
          ) : (
            <ArrowPathIcon className="w-4 animate-spin" />
          )}
        </button>
      </form>
    </>
  );
}
