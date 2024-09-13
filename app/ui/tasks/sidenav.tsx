import Link from "next/link";
import { PowerIcon } from "@heroicons/react/24/outline";
import NavLinks from "./links";

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-20"
        href="/"
      >
        <p className="text-[22px] text-white">Task Tracker</p>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block">
          <NavLinks />
        </div>
      </div>
    </div>
  );
}
