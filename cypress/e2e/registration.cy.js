describe("Online Student Registration - UI tests", () => {
  beforeEach(() => {
    cy.request("POST", "/api/test/reset");
    cy.visit("/");
  });

  const fillValidForm = (email = "asha@example.com") => {
    cy.get('[data-testid="name"]').type("Asha Kumar");
    cy.get('[data-testid="email"]').type(email);
    cy.get('[data-testid="phone"]').type("9876543210");
    cy.get('[data-testid="age"]').type("20");
    cy.get('[data-testid="course"]').select("Computer Science");
    cy.get('[data-testid="password"]').type("StrongPass123");
  };

  it("TC01 registers a student with valid details", () => {
    fillValidForm();
    cy.get('[data-testid="submit"]').click();
    cy.contains("Registration successful").should("be.visible");
  });

  it("TC02 rejects an empty name", () => {
    cy.get('[data-testid="email"]').type("emptyname@example.com");
    cy.get('[data-testid="phone"]').type("9876543210");
    cy.get('[data-testid="age"]').type("20");
    cy.get('[data-testid="course"]').select("Computer Science");
    cy.get('[data-testid="password"]').type("StrongPass123");
    cy.get('[data-testid="submit"]').click();
    cy.get('[data-error="name"]').should("contain", "Name is required");
  });

  it("TC03 rejects an invalid email", () => {
    fillValidForm("not-an-email");
    cy.get('[data-testid="submit"]').click();
    cy.get('[data-error="email"]').should("contain", "valid email");
  });

  it("TC04 rejects a short phone number", () => {
    fillValidForm();
    cy.get('[data-testid="phone"]').clear().type("12345");
    cy.get('[data-testid="submit"]').click();
    cy.get('[data-error="phone"]').should("contain", "10-digit");
  });

  it("TC05 rejects a password shorter than 8 characters", () => {
    fillValidForm();
    cy.get('[data-testid="password"]').clear().type("abc123");
    cy.get('[data-testid="submit"]').click();
    cy.get('[data-error="password"]').should("contain", "at least 8");
  });

  it("TC06 requires a course selection", () => {
    fillValidForm();
    cy.get('[data-testid="course"]').select("");
    cy.get('[data-testid="submit"]').click();
    cy.get('[data-error="course"]').should("contain", "select a course");
  });

  it("TC07 accepts the lower age boundary of 16", () => {
    fillValidForm("age16@example.com");
    cy.get('[data-testid="age"]').clear().type("16");
    cy.get('[data-testid="submit"]').click();
    cy.contains("Registration successful").should("be.visible");
  });

  it("TC08 accepts the upper age boundary of 100", () => {
    fillValidForm("age100@example.com");
    cy.get('[data-testid="age"]').clear().type("100");
    cy.get('[data-testid="submit"]').click();
    cy.contains("Registration successful").should("be.visible");
  });

  it("TC09 rejects age below 16", () => {
    fillValidForm();
    cy.get('[data-testid="age"]').clear().type("15");
    cy.get('[data-testid="submit"]').click();
    cy.get('[data-error="age"]').should("contain", "16 and 100");
  });

  it("TC10 rejects age above 100", () => {
    fillValidForm();
    cy.get('[data-testid="age"]').clear().type("101");
    cy.get('[data-testid="submit"]').click();
    cy.get('[data-error="age"]').should("contain", "16 and 100");
  });

  it("TC11 rejects a duplicate email address", () => {
    fillValidForm("duplicate@example.com");
    cy.get('[data-testid="submit"]').click();
    cy.contains("Registration successful").should("be.visible");
    fillValidForm("duplicate@example.com");
    cy.get('[data-testid="submit"]').click();
    cy.contains("already registered").should("be.visible");
  });

  it("TC12 trims surrounding spaces from a valid name", () => {
    fillValidForm("spaces@example.com");
    cy.get('[data-testid="name"]').clear().type("  Asha Kumar  ");
    cy.get('[data-testid="submit"]').click();
    cy.contains("Registration successful").should("be.visible");
  });
});
