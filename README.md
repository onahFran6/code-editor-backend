# Code Editor Backend Server

This is the backend server for the Code Editor application. It provides APIs for user authentication, problem management, code submission, and user attempt tracking.

## Table of Contents

- [Code Editor Backend Server](#code-editor-backend-server)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Navigate to the project directory:](#navigate-to-the-project-directory)
  - [Install the dependencies:](#install-the-dependencies)
  - [Configuration](#configuration)
  - [Database Setup](#database-setup)
  - [(Optional)](#optional)
    - [`Start the Server`](#start-the-server)
  - [API Endpoints](#api-endpoints)
  - [The backend server includes a test suite to ensure the correctness of its functionality. To run the tests, use the following command:](#the-backend-server-includes-a-test-suite-to-ensure-the-correctness-of-its-functionality-to-run-the-tests-use-the-following-command)
  - [The backend server relies on the following key dependencies:](#the-backend-server-relies-on-the-following-key-dependencies)
  - [folder structure](#folder-structure)
  - [License](#license)

## Prerequisites

Before running the backend server, ensure that you have the following prerequisites installed on your system:

- Node.js (v12 or higher)
- npm (Node Package Manager)
- MySQL database

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/code-editor-backend.git
   ```

## Navigate to the project directory:

## Install the dependencies:

```bash
   npm install
```

## Configuration

Create a .env file in the root directory of the project.
Configure the following environment variables in the .env file:

```
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=code_editor
DB_USER=your-username
DB_PASSWORD=your-password
JWT_SECRET=your-jwt-secret
JUDGE0_API_KEY=
```

Replace your-username, your-password, and your-jwt-secret with your actual database credentials and JWT secret.

## Database Setup

Create a new MySQL database for the application.
Update the database connection details in the .env file.
Run the database migrations to create the required tables:

```bash
npm run db:migrate
```

## (Optional)

Seed the database with sample data:

```bash
npm run db:seed

```

### `Start the Server`

Runninh the server on your local environment

```
npm run dev

# or

yarn run dev

```

## API Endpoints

The following API endpoints are available:

```
POST /api/v1/users/register -       Register a new user

POST /api/v1/users/login -          User login

GET /api/v1/problems -             Get a list of programming problems

GET /api/v1/problems/:id -         Get a specific programming problem

POST /api/v1/attempts -            Submit a code attempt

GET /api/v1/attempts/problems/:problemId -     Get all attempt for a specific problem

GET /api/v1/admin/users -          Get a list of users (admin only)

GET /api/v1/admin/users/:userId/attempts -       Get all code attempts (admin only)

GET /api/v1/admin/users/:userId/stats -       Get user stats (admin only

```

For detailed information about request and response payloads, refer to the API documentation.
Testing

## The backend server includes a test suite to ensure the correctness of its functionality. To run the tests, use the following command:

```
bash
npm test

```

The test results will be displayed in the console.
Dependencies

## The backend server relies on the following key dependencies:

- [Express.js - Web framework for building the API endpoints]

- [Sequelize - ORM for interacting with the MySQL database]

- [jsonwebtoken - JSON Web Token implementation for authentication]

- [bcrypt - Library for hashing passwords]

- [Jest - Testing framework for writing and running tests]

For a complete list of dependencies, refer to the package.json file.
Contributing

Contributions to the backend server are welcome! If you find any issues or have suggestions for improvements, please create an issue or submit a pull request on the GitHub repository.
When contributing, please follow the existing code style and conventions, and ensure that your changes are well-tested.

## folder structure

```
.
├── LICENSE
├── README.md
├── combined.log
├── config
│   └── config.json
├── coverage
│   ├── clover.xml
│   ├── coverage-final.json
│   ├── lcov-report
│   │   ├── base.css
│   │   ├── block-navigation.js
│   │   ├── config
│   │   │   ├── db.ts.html
│   │   │   ├── index.html
│   │   │   └── index.ts.html
│   │   ├── favicon.png
│   │   ├── index.html
│   │   ├── models
│   │   │   ├── attemptModel.ts.html
│   │   │   ├── index.html
│   │   │   ├── index.ts.html
│   │   │   ├── problemModel.ts.html
│   │   │   ├── solutionModel.ts.html
│   │   │   ├── testCasesModel.ts.html
│   │   │   └── userModel.ts.html
│   │   ├── prettify.css
│   │   ├── prettify.js
│   │   ├── services
│   │   │   ├── attemptsService.ts.html
│   │   │   ├── index.html
│   │   │   ├── problemService.ts.html
│   │   │   └── userService.ts.html
│   │   ├── sort-arrow-sprite.png
│   │   ├── sorter.js
│   │   ├── src
│   │   │   ├── app.ts.html
│   │   │   ├── config
│   │   │   ├── constants
│   │   │   ├── controllers
│   │   │   ├── index.html
│   │   │   ├── lib
│   │   │   ├── middleware
│   │   │   ├── models
│   │   │   ├── routes
│   │   │   ├── services
│   │   │   └── utils
│   │   └── utils
│   │       ├── customError.ts.html
│   │       ├── index.html
│   │       ├── index.ts.html
│   │       └── passwordUtil.ts.html
│   └── lcov.info
├── dist
│   ├── app.js
│   ├── app.js.map
│   ├── config
│   │   ├── db.js
│   │   ├── db.js.map
│   │   ├── index.js
│   │   └── index.js.map
│   ├── constants
│   │   ├── index.js
│   │   ├── index.js.map
│   │   ├── jsTemplate.js
│   │   ├── jsTemplate.js.map
│   │   ├── language.js
│   │   ├── language.js.map
│   │   ├── pyTemplate.js
│   │   └── pyTemplate.js.map
│   ├── controllers
│   │   ├── adminController.js
│   │   ├── adminController.js.map
│   │   ├── attemptController.js
│   │   ├── attemptController.js.map
│   │   ├── authController.js
│   │   ├── authController.js.map
│   │   ├── problemController.js
│   │   └── problemController.js.map
│   ├── lib
│   │   └── validators
│   │       ├── attemptsValidator.js
│   │       ├── attemptsValidator.js.map
│   │       ├── authValidator.js
│   │       └── authValidator.js.map
│   ├── middleware
│   │   ├── authMiddleware.js
│   │   ├── authMiddleware.js.map
│   │   ├── errorMiddleware.js
│   │   └── errorMiddleware.js.map
│   ├── models
│   │   ├── attemptModel.js
│   │   ├── attemptModel.js.map
│   │   ├── index.js
│   │   ├── index.js.map
│   │   ├── problemModel.js
│   │   ├── problemModel.js.map
│   │   ├── solutionModel.js
│   │   ├── solutionModel.js.map
│   │   ├── testCasesModel.js
│   │   ├── testCasesModel.js.map
│   │   ├── userModel.js
│   │   └── userModel.js.map
│   ├── routes
│   │   ├── adminRoutes.js
│   │   ├── adminRoutes.js.map
│   │   ├── attemptRoutes.js
│   │   ├── attemptRoutes.js.map
│   │   ├── authRoutes.js
│   │   ├── authRoutes.js.map
│   │   ├── problemRoutes.js
│   │   └── problemRoutes.js.map
│   ├── server.js
│   ├── server.js.map
│   ├── services
│   │   ├── attemptsService.js
│   │   ├── attemptsService.js.map
│   │   ├── judge0Service.js
│   │   ├── judge0Service.js.map
│   │   ├── problemService.js
│   │   ├── problemService.js.map
│   │   ├── userService.js
│   │   └── userService.js.map
│   ├── types
│   │   ├── express
│   │   │   ├── index.js
│   │   │   └── index.js.map
│   │   ├── index.type.js
│   │   └── index.type.js.map
│   └── utils
│       ├── customError.js
│       ├── customError.js.map
│       ├── customResponse.js
│       ├── customResponse.js.map
│       ├── index.js
│       ├── index.js.map
│       ├── logger.js
│       ├── logger.js.map
│       ├── multer.js
│       ├── multer.js.map
│       ├── passwordUtil.js
│       └── passwordUtil.js.map
├── error.log
├── jest.config.js
├── migrations
│   ├── 20240608063333-create-users.js
│   ├── 20240608063407-create-problems.js
│   ├── 20240608063433-create-attempts.js
│   ├── 20240609101526-create-solutions.js
│   ├── 20240609115340-empty-database.js
│   ├── 20240609115723-drop-solutions-table.js
│   ├── 20240609115757-create-solutions-table.js
│   ├── 20240609115934-empty-database.js
│   ├── 20240609120608-drop-table-database.js
│   ├── 20240610002638-user-database.js
│   ├── 20240610010918-add-remove-fields-to-users.js
│   ├── 20240610091128-add_foreign_key_to_testcases.js
│   ├── 20240610091158-add_foreign_key_to_testcases.js
│   ├── 20240610091507-20240610091158-add_foreign_key_to_testcases.js
│   ├── 20240611030849-remove-email-index.js
│   └── 20240611031017-20240611030849-remove-email-index.js
├── models
│   └── index.js
├── package-lock.json
├── package.json
├── prettier.config.js
├── seeders
│   ├── 20240609091205-demo-problem.js
│   ├── 20240609091216-demo-solution.js
│   ├── 20240609123253-test-cases.js
│   └── 20240609134921-attempt.js
├── src
│   ├── app.ts
│   ├── config
│   │   ├── db.ts
│   │   └── index.ts
│   ├── constants
│   │   ├── index.ts
│   │   ├── jsTemplate.ts
│   │   ├── language.ts
│   │   └── pyTemplate.ts
│   ├── controllers
│   │   ├── adminController.ts
│   │   ├── attemptController.ts
│   │   ├── authController.ts
│   │   └── problemController.ts
│   ├── lib
│   │   └── validators
│   │       ├── attemptsValidator.ts
│   │       └── authValidator.ts
│   ├── middleware
│   │   ├── authMiddleware.ts
│   │   └── errorMiddleware.ts
│   ├── models
│   │   ├── attemptModel.ts
│   │   ├── index.ts
│   │   ├── problemModel.ts
│   │   ├── solutionModel.ts
│   │   ├── testCasesModel.ts
│   │   └── userModel.ts
│   ├── routes
│   │   ├── adminRoutes.ts
│   │   ├── attemptRoutes.ts
│   │   ├── authRoutes.ts
│   │   └── problemRoutes.ts
│   ├── server.ts
│   ├── services
│   │   ├── attemptsService.ts
│   │   ├── judge0Service.ts
│   │   ├── problemService.ts
│   │   └── userService.ts
│   ├── test
│   │   ├── integrations
│   │   │   ├── admin.test.ts
│   │   │   ├── attempt.test.ts
│   │   │   ├── problem.test.ts
│   │   │   └── user.test.ts
│   │   └── units
│   ├── types
│   │   ├── express
│   │   │   └── index.ts
│   │   └── index.type.ts
│   └── utils
│       ├── callJudge0API.ts
│       ├── customError.ts
│       ├── customResponse.ts
│       ├── getLanguageID.ts
│       ├── index.ts
│       ├── logger.ts
│       ├── multer.ts
│       ├── passwordUtil.ts
│       └── wrapCodeWithTestCase.ts
├── tsconfig.json
└── vercel.json

```

## License

This project is licensed under the MIT License.
