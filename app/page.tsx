"use client";
import Image from "next/image";
import { Provider } from "react-redux";
import { store } from "./store/store";
import TaskManager from "./components/TaskManager";

export default function Home() {
  return (
    <Provider store={store}>
      <main className="min-h-screen flex items-center justify-center">
        <TaskManager />
      </main>
    </Provider>
  );
}
