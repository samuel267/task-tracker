import Breadcrumbs from "@/app/components/tasks/breadcrumbs";
import Form from "@/app/components/tasks/taskForm";

export default async function CreateTaskPage() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Tasks", href: "/tasks" },
          {
            label: "Create Task",
            href: "/tasks/create",
            active: true,
          },
        ]}
      />
      <Form editTask={false} taskId="" />
    </main>
  );
}
