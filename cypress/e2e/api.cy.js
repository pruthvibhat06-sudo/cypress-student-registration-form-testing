describe("Student Registration REST API tests", () => {
  beforeEach(() => cy.request("POST", "/api/test/reset"));

  const validStudent = {
    name: "Ravi Kumar",
    email: "ravi@example.com",
    phone: "9876543210",
    age: 21,
    course: "Information Science",
    password: "StrongPass123"
  };

  it("TC13 returns 201 and a student object for valid input", () => {
    cy.request("POST", "/api/register", validStudent).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.success).to.eq(true);
      expect(response.body.student.email).to.eq("ravi@example.com");
    });
  });

  it("TC14 returns 400 for a missing required field", () => {
    const invalid = { ...validStudent, name: "" };
    cy.request({ method: "POST", url: "/api/register", body: invalid, failOnStatusCode: false })
      .then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.errors).to.have.property("name");
      });
  });

  it("TC15 returns 409 for a duplicate email", () => {
    cy.request("POST", "/api/register", validStudent);
    cy.request({
      method: "POST", url: "/api/register", body: validStudent, failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(409);
      expect(response.body.errors.email).to.contain("already registered");
    });
  });

  it("TC16 returns registered students from the listing endpoint", () => {
    cy.request("POST", "/api/register", validStudent);
    cy.request("GET", "/api/students").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.students).to.have.length(1);
    });
  });
});
