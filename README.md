This is the backend server for the Code Editor application. It provides APIs for user authentication, problem management, code submission, and user attempt tracking.

## Table of Contents

- [Code Editor Backend Server](#code-editor-backend-server)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Database Setup](#database-setup)
  - [Running the Server](#running-the-server)
    - [Without Docker](#without-docker)
    - [With Docker](#with-docker)
  - [Terraform Setup](#terraform-setup)
    - [Why Use AWS ECS for Deployment](#why-use-aws-ecs-for-deployment)
    - [Benefits of Using Terraform Scripts](#benefits-of-using-terraform-scripts)
    - [Steps to Set Up ECR and Deploy Backend Server Using Terraform](#steps-to-set-up-ecr-and-deploy-backend-server-using-terraform)
  - [API Endpoints](#api-endpoints)
  - [Testing](#testing)
  - [Dependencies](#dependencies)
  - [Contributing](#contributing)
  - [Folder Structure](#folder-structure)
  - [License](#license)

## Prerequisites

Before running the backend server, ensure that you have the following prerequisites installed on your system:

- Node.js (v12 or higher)
- npm (Node Package Manager)
- MySQL database
- Docker (if using Docker)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/code-editor-backend.git


2. Navigate to the project directory:

   ```bash
   cd code-editor-backend


3. Install the dependencies:
    ```bash
    npm install

##  Configuration
Create a .env file in the root directory of the project. Configure the following environment variables in the .env file:
text
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
Create a new MySQL database for the application. Update the database connection details in the .env file. Run the database migrations to create the required tables:
    ```bash
    npm run db:migrate

## (Optional)
Seed the database with sample data:
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

## With Docker
To run the server using Docker, follow these steps:
Build the Docker image:
```
docker build -t code-editor-backend .
```

Run the Docker container:

```
docker run --env-file .env -p 3000:3000 code-editor-backend
```

This will start your server inside a Docker container using the configurations specified in your .env file.

# Deployment to AWS Elastic Container Service (ECS) 

## Terraform Setup
The Terraform scripts included in this project are crucial for automating infrastructure setup on AWS, specifically for deploying the backend server and managing associated services.

### Why Use AWS ECS for Deployment
AWS Elastic Container Service (ECS) offers several advantages for deploying applications:
-   Managed Service: ECS is a fully managed service that simplifies running containers at scale without needing to manage servers or clusters directly.

-   Integration with AWS Services: ECS integrates seamlessly with other AWS services like CloudWatch for monitoring, IAM for security, and ECR for container storage, providing a cohesive environment for application deployment.

-   Scalability: ECS allows you to easily scale your applications up or down based on demand. You can define scaling policies that automatically adjust resources according to traffic patterns.

-   Cost Efficiency: With ECS, you only pay for what you use. It supports both EC2 launch types and Fargate, which allows you to run containers without managing servers, optimizing costs based on your application's needs.

-   High Availability: ECS automatically distributes tasks across multiple availability zones, ensuring that your application remains available even in case of failures.

### Benefits of Using Terraform Scripts
Using Terraform scripts in this project provides several benefits:

-   Infrastructure as Code: Define your infrastructure in code, making it reproducible and easier to manage. This reduces manual configuration errors and helps maintain consistency across environments.

-   Automation: Automate AWS resource creation and management, such as ECR (Elastic Container Registry), ECS (Elastic Container Service), load balancers, and VPCs (Virtual Private Clouds), enabling you to focus on application development instead of infrastructure management.

-   Ease of Use: With well-defined Terraform scripts, setting up your infrastructure becomes straightforward. You can quickly deploy or update resources without needing deep knowledge of AWS services.

-   Version Control: Track changes over time using version control systems like Git, making it easier to roll back to previous states if necessary.

-   Scalability and Flexibility: Easily scale your infrastructure as your application grows. Terraform modules allow for reusable configurations, simplifying adaptation to changing requirements.



## Terraform AWS Infrastructure Setup

This project uses Terraform to provision and manage AWS infrastructure. The infrastructure includes VPC, subnets, security groups, load balancers, ECS clusters, RDS instances, and S3 buckets.

### Requirements

- [Terraform](https://www.terraform.io/downloads.html) (Ensure you have the latest version installed)
- [AWS CLI](https://aws.amazon.com/cli/) (Ensure it's configured with the correct credentials)

## AWS CLI Setup

### Step 1: Configure AWS Credentials

You need to set up your AWS CLI with the appropriate credentials. Follow these steps:

1. **Install AWS CLI** (if not already installed):

   - On macOS, you can install AWS CLI using Homebrew:
     ```sh
     brew install awscli
     ```

2. **Set up AWS Credentials**:
   - Open or create the AWS credentials file:
     - On macOS/Linux: `~/.aws/credentials`
   - Add the following configuration (replace `YOUR_WORK_ACCESS_KEY` and `YOUR_WORK_SECRET_KEY` with the credentials sent to you via WhatsApp):
     ```ini
     [interwap]
     aws_access_key_id = YOUR_WORK_ACCESS_KEY
     aws_secret_access_key = YOUR_WORK_SECRET_KEY
     ```

### Step 2: Configure AWS CLI Profile

1. **Open or create the AWS config file**:
   - On macOS/Linux: `~/.aws/config`
2. **Add the following configuration**:
   ```ini
   [profile <profile name>]
   region = us-east-1
   output = json
   ```

### Step 3: Set AWS Profile

On your shell/CLI set the `AWS_PROFILE` environment variable:

```sh
export AWS_PROFILE=<profile name>
```

## Terraform Usage

### Step 1: Initialize the Terraform Project

Before you can use Terraform effectively, you need to initialize your project directory. This step downloads the necessary provider plugins and modules required by your configuration files. Make sure to fill in terraform.tfvars with appropriate values before running initialization.

```sh
cd infractructure
terraform init
```

### Step 2: Plan the Infrastructure

To see what changes Terraform will make to your infrastructure, run the plan command:

```sh
terraform plan -var-file=terraform.tfvars
```

### Step 3: Apply the Configuration

When you're ready to apply the changes, use the following command. This will create and/or modify the infrastructure as defined in your Terraform files:

```sh
terraform apply -var-file=terraform.tfvars --auto-approve
```

### Step 4: Modify Terraform Variables

Before applying the Terraform configuration, ensure that the `terraform.tfvars` file has the correct values, especially for the ECS task definition and other environment-specific configurations.

### Step 5: Destroy the Infrastructure (Optional)

When you're finished and want to tear down the infrastructure, you can use the destroy command:

```sh
terraform destroy -var-file=terraform.tfvars --auto-approve
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
├── Dockerfile
├── LICENSE
├── README.md
├── config
│   └── config.json
├── dist
│   ├── app.js
│   ├── app.js.map
│   ├── config
│   ├── constants
│   ├── controllers
│   ├── lib
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── server.js
│   ├── server.js.map
│   ├── services
│   ├── test
│   ├── types
│   └── utils
├── entrypoint.sh
├── infrastructure
│   ├── main.tf
│   ├── modules
│   ├── readme.md
│   ├── terraform.tfvars
│   ├── terraform.tfvars.sample
│   └── variable.tf
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
│   ├── 20240611031017-20240611030849-remove-email-index.js
│   ├── 20240613015024-add-code-snippet-table.js
│   ├── 20240613015250-20240613015024-add-code-snippet-table.js
│   ├── 20240613071927-20240613015024-add-code-snippet-table.js
│   └── 20240613072119-20240613015024-add-code-snippet-table.js
├── models
│   └── index.js
├── package-lock.json
├── package.json
├── prettier.config.js
├── seeders
│   ├── 20240609091205-demo-problem.js
│   ├── 20240609091216-demo-solution.js
│   ├── 20240609123253-test-cases.js
│   ├── 20240609134921-attempt.js
│   └── 20240613020428-code-snippets.js
├── src
│   ├── app.ts
│   ├── config
│   ├── constants
│   ├── controllers
│   ├── lib
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── server.ts
│   ├── services
│   ├── test
│   ├── types
│   └── utils
├── tsconfig.json
└── vercel.json

```

## License

This project is licensed under the MIT License.
