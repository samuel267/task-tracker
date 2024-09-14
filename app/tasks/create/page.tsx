import Breadcrumbs from "@/app/components/tasks/breadcrumbs";
import Form from "@/app/components/tasks/taskForm";

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
