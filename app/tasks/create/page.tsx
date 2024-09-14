import Breadcrumbs from "@/app/ui/tasks/breadcrumbs";
import Form from "@/app/ui/tasks/taskForm";

export default async function CreateTaskPage() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Invoices", href: "/dashboard/invoices" },
          {
            label: "Create Invoice",
            href: "/dashboard/invoices/create",
            active: true,
          },
        ]}
      />
      <Form editTask={false} taskId="" />
    </main>
  );
}
