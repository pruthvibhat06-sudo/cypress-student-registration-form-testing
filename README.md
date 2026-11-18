# Cypress Automated Testing of an Online Student Registration System

## Project overview
A demo student registration website and Express REST API tested with Cypress. The project demonstrates UI automation, API testing, functional validation, boundary-value analysis, negative testing, and backend unit tests.

## Technology
- Node.js and Express
- HTML, CSS, JavaScript
- Cypress (UI and API automation)
- Node.js built-in test runner
- c8 for backend unit-test coverage

## Prerequisites
Install Node.js 18+ and npm. Use VS Code or another editor.

## Installation
```bash
npm install
```

## Run the application
```bash
npm start
```
Open http://localhost:3000.

## Run tests
Keep the application running in one terminal. In another terminal:
```bash
npm run test:e2e
```
Interactive Cypress runner:
```bash
npm run test:e2e:open
```
Backend unit tests:
```bash
npm run test:unit
```
Backend unit-test coverage:
```bash
npm run test:coverage
```
The HTML coverage report is created in `coverage/`.

## Test design
The Cypress suite covers valid registration, required fields, email format, mobile number format, password length, course selection, age boundaries (16 and 100), invalid ages, duplicate email, and API response codes.

## Important notes
- Student records are stored in memory for this teaching demo. Restarting the server clears the records.
- `/api/test/reset` is a local testing helper and is disabled when `NODE_ENV=production`.
- The c8 report measures backend unit-test coverage. It is not Cypress browser-code coverage.
- Do not present pass/fail counts or coverage percentages until you have run the tests locally. Capture your own terminal output for Slide 6 and your generated `coverage/index.html` for Slide 8.

## Pair responsibilities
Student A (Tool Architect): Cypress installation/configuration, test runner, test scripts, execution evidence, and reporting.
Student B (SUT Engineer): registration requirements, frontend/backend implementation, validation rules, formal test matrix, and defect analysis.

## Suggested GitHub repository contents
Commit this complete project, add your team member names/USNs to the presentation and README, and include genuine test screenshots after execution.
