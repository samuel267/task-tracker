import Breadcrumbs from "@/app/ui/tasks/breadcrumbs";
import Form from "@/app/ui/tasks/taskForm";

export default function CreateTaskPage({ params }: { params: { id: string } }) {
  const id = params.id;
  console.log(params.id);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Tasks", href: "/tasks" },
          {
            label: "Edit Task",
            href: `/tasks/create/${id}`,
            active: true,
          },
        ]}
      />
      <Form editTask={true} taskId={`${id}`} />
    </main>
  );
}
