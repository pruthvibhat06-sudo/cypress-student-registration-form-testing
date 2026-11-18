const express = require("express");
const path = require("path");
const { registerStudent, listStudents, resetStudents } = require("./registration");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

app.post("/api/register", (req, res) => {
  const result = registerStudent(req.body);
  res.status(result.status).json(result.body);
});

app.get("/api/students", (_req, res) => res.json({ students: listStudents() }));

// Test helper: available only in the local test environment.
if (process.env.NODE_ENV !== "production") {
  app.post("/api/test/reset", (_req, res) => {
    resetStudents();
    res.json({ success: true });
  });
}

app.get("*", (_req, res) => res.sendFile(path.join(__dirname, "../frontend/index.html")));

if (require.main === module) {
  app.listen(PORT, () => console.log(`Student Registration app running at http://localhost:${PORT}`));
}

module.exports = app;
