const students = [];

function validateStudent(input) {
  const errors = {};
  const name = typeof input.name === "string" ? input.name.trim() : "";
  const email = typeof input.email === "string" ? input.email.trim().toLowerCase() : "";
  const phone = typeof input.phone === "string" ? input.phone.trim() : "";
  const age = Number(input.age);
  const course = typeof input.course === "string" ? input.course.trim() : "";
  const password = typeof input.password === "string" ? input.password : "";

  if (!name) errors.name = "Name is required";
  else if (!/^[A-Za-z ]{2,60}$/.test(name)) errors.name = "Name must contain 2–60 letters and spaces";

  if (!email) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Enter a valid email address";

  if (!/^[6-9]\d{9}$/.test(phone)) errors.phone = "Enter a valid 10-digit Indian mobile number";

  if (!Number.isInteger(age) || age < 16 || age > 100) {
  errors.age = "Age must be between 16 and 100";
}

  if (!course) errors.course = "Please select a course";
  if (password.length < 8) errors.password = "Password must be at least 8 characters";

  return { errors, normalized: { name, email, phone, age, course } };
}

function registerStudent(input) {
  const { errors, normalized } = validateStudent(input || {});
  if (Object.keys(errors).length) {
    return { status: 400, body: { success: false, errors } };
  }
  if (students.some((student) => student.email === normalized.email)) {
    return { status: 409, body: { success: false, errors: { email: "This email is already registered" } } };
  }
  const student = { id: students.length + 1, ...normalized };
  students.push(student);
  return { status: 201, body: { success: true, message: "Registration successful", student } };
}

function listStudents() {
  return students.map((student) => ({ ...student }));
}

function resetStudents() {
  students.length = 0;
}

module.exports = { validateStudent, registerStudent, listStudents, resetStudents };
