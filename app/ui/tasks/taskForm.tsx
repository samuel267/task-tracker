"use client";
import Link from "next/link";
import {
  ArrowPathIcon,
  CalendarIcon,
  CheckIcon,
  ClockIcon,
  HashtagIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import { Button } from "./button";
import { useState } from "react";
import { z } from "zod";
import { createTask } from "@/app/lib/actions";
import { TaskResponse } from "@/app/lib/definitions";
import { useDispatch, useSelector } from "react-redux";
// Define the Zod schema
const taskSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title cannot exceed 100 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description cannot exceed 500 characters"),
  dueDate: z.string().min(1, "Please enter due date."),
  status: z.enum(["pending", "in progress", "completed"], {
    invalid_type_error: "Please select task status.",
  }),
});

type StatusOptions = "pending" | "in progress" | "completed";

export default function Form() {
  const [formData, setFormData] = useState<Omit<TaskResponse, "id">>({
    title: "",
    description: "",
    dueDate: "",
    status: "pending" as StatusOptions,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "dueDate") {
      setFormData((prevData) => ({
        ...prevData,
        dueDate: new Date(value).toISOString().split("T")[0],
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value.toLowerCase() }));
    }
  };

  const dispatch = useDispatch();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await taskSchema.parseAsync(formData);
      // If no errors, submit the form
      // Add your submission logic here
      await createTask(formData);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const flattenedErrors = err.flatten().fieldErrors;
        const formattedErrors: Record<string, string> = {};

        Object.entries(flattenedErrors).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            formattedErrors[key] = value[0];
          }
        });

        setErrors(formattedErrors);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* ... rest of your JSX remains the same ... */}

      <div className="mb-4">
        <label htmlFor="title" className="mb-2 block text-sm font-medium">
          Task Title
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter the task title"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="title-error"
            />
            <HashtagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </div>
        <div id="title-error" aria-live="polite" aria-atomic="true">
          {errors.title && (
            <p className="mt-2 text-sm text-red-500">{errors.title}</p>
          )}
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="mb-2 block text-sm font-medium">
          Task Description
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter the description"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="description-error"
            />
            <TagIcon className="pointer-events-none absolute left-3 top-1/3 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </div>
        <div id="description-error" aria-live="polite" aria-atomic="true">
          {errors.description && (
            <p className="mt-2 text-sm text-red-500">{errors.description}</p>
          )}
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="dueDate" className="mb-2 block text-sm font-medium">
          Set due date
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <input
              id="dueDate"
              name="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={handleChange}
              placeholder="Select date"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="dueDate-error"
            />
            <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </div>
        <div id="dueDate-error" aria-live="polite" aria-atomic="true">
          {errors.dueDate && (
            <p className="mt-2 text-sm text-red-500">{errors.dueDate}</p>
          )}
        </div>
      </div>

      <fieldset>
        <legend className="mb-2 block text-sm font-medium">
          Set task status
        </legend>
        <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
          <div className="flex gap-4">
            <div className="flex items-center">
              <input
                id="pending"
                name="status"
                type="radio"
                value="pending"
                checked={formData.status === "pending"}
                onChange={handleChange}
                className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                aria-describedby="status-error"
              />
              <label
                htmlFor="pending"
                className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
              >
                Pending <ClockIcon className="h-4 w-4" />
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="in-progress"
                name="status"
                type="radio"
                value="in progress"
                checked={formData.status === "in progress"}
                onChange={handleChange}
                className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                aria-describedby="status-error"
              />
              <label
                htmlFor="in-progress"
                className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-yellow-500 px-3 py-1.5 text-xs font-medium text-white"
              >
                In Progress <ArrowPathIcon className="h-4 w-4" />
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="completed"
                name="status"
                type="radio"
                value="completed"
                checked={formData.status === "completed"}
                onChange={handleChange}
                className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                aria-describedby="status-error"
              />
              <label
                htmlFor="completed"
                className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
              >
                Completed <CheckIcon className="h-4 w-4" />
              </label>
            </div>
          </div>
        </div>
        <div id="status-error" aria-live="polite" aria-atomic="true">
          {errors.status && (
            <p className="mt-2 text-sm text-red-500">{errors.status}</p>
          )}
        </div>
      </fieldset>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/tasks"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Add Task</Button>
      </div>
    </form>
  );
}
