import {
  ArrowPathIcon,
  CheckIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";

export default function TaskStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2 py-1 text-xs",
        {
          "bg-gray-100 text-gray-500": status === "pending",
          "bg-green-500 text-white": status === "completed",
          "bg-yellow-500 text-white": status === "in progress",
        }
      )}
    >
      {status === "pending" ? (
        <>
          Pending
          <ClockIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {status === "in progress" ? (
        <>
          In Progress
          <ArrowPathIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
      {status === "completed" ? (
        <>
          Completed
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
