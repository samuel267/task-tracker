import Breadcrumbs from "@/app/components/tasks/breadcrumbs";
import Form from "@/app/components/tasks/taskForm";

export default async function CreateTaskPage() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Tasks", href: "#" },
          {
            label: "Create Task",
            href: "#",
            active: true,
          },
        ]}
      />
      <Form editTask={false} taskId="" />
    </main>
  );
}
