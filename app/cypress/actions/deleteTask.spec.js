describe("Task Deletion", () => {
  beforeEach(() => {
    cy.visit("/tasks"); // Adjust the path to where your task list page is located
  });

  it("should delete a task when the delete button is clicked", () => {
    // Find the delete button using the data-testid attribute and click it
    cy.get('[data-testid="delete-task"]').first().click();

    // You can then assert that the task was deleted (this will vary based on your app logic)
    cy.contains("Task deleted").should("exist"); // Example assertion for success message
  });
});
