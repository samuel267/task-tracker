import Breadcrumbs from "@/app/ui/tasks/breadcrumbs";
import Form from "@/app/ui/tasks/taskForm";

export default async function Page() {
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
      <Form />
    </main>
  );
}
