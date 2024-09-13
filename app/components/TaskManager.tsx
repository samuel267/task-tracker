"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
// import { deleteTask, updateTask } from "../store/taskSlice";
import { Button, Input, Card } from "@nextui-org/react";

export default function TaskManager() {
  const [newTask, setNewTask] = useState("");
  const [isClient, setIsClient] = useState(false);
  const tasks = useSelector((state: RootState) => state.tasks?.list || []);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsClient(true); // Ensures localStorage is accessible on client-side
  }, []);

  //   const handleAddTask = () => {
  //     if (newTask.trim()) {
  //       dispatch(addTask(newTask));
  //       setNewTask("");
  //     }
  //   };

  if (!isClient) {
    return <div>Loading...</div>; // Render nothing on the server
  }

  return (
    <div className="p-4">
      <Card className="p-6 mb-4">
        <h2 className="text-xl mb-2">Task Manager</h2>
        <Input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add new task"
          fullWidth
        />
        {/* <Button className="mt-2" onPress={handleAddTask}>
          Add Task
        </Button> */}
      </Card>

      {/* <ul className="space-y-2">
        {tasks.map((task) => (
          <Card key={task.id} className="p-4 flex justify-between items-center">
            <div>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => dispatch(toggleTask(task.id))}
                className="mr-2"
              />
              <span className={task.completed ? "line-through" : ""}>
                {task.title}
              </span>
            </div>
            <div>
              <Button
                color="danger"
                onPress={() => dispatch(deleteTask(task.id))}
              >
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </ul> */}
    </div>
  );
}
