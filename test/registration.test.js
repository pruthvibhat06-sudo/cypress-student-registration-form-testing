const test = require("node:test");
const assert = require("node:assert/strict");
const { validateStudent, registerStudent, resetStudents, listStudents } = require("../backend/registration");

const valid = {
  name: "Asha Kumar", email: "asha@example.com", phone: "9876543210",
  age: 20, course: "Computer Science", password: "StrongPass123"
};

test.beforeEach(() => resetStudents());

test("valid student data passes validation", () => {
  assert.deepEqual(validateStudent(valid).errors, {});
});

test("email is normalized to lowercase", () => {
  const result = validateStudent({ ...valid, email: "ASHA@EXAMPLE.COM" });
  assert.equal(result.normalized.email, "asha@example.com");
});

test("age below 16 fails validation", () => {
  assert.ok(validateStudent({ ...valid, age: 15 }).errors.age);
});

test("age above 100 fails validation", () => {
  assert.ok(validateStudent({ ...valid, age: 101 }).errors.age);
});

test("registration creates one student", () => {
  const result = registerStudent(valid);
  assert.equal(result.status, 201);
  assert.equal(listStudents().length, 1);
});

test("duplicate email is rejected", () => {
  registerStudent(valid);
  const result = registerStudent({ ...valid, name: "Ravi Kumar" });
  assert.equal(result.status, 409);
});

test("malformed email is rejected", () => {
  assert.ok(validateStudent({ ...valid, email: "wrong" }).errors.email);
});

test("non-numeric age is rejected", () => {
  assert.ok(validateStudent({ ...valid, age: "twenty" }).errors.age);
});
