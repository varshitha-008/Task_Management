# Task Management System

A Task Management System built with Node.js, Express, MongoDB, and JWT authentication. Users can create, assign, update, delete, and manage tasks with role-based access control.

## Features

- **User Roles**: Admin, Task Creator, and Task Assignee.
- **Task CRUD Operations**: Create, read, update, and delete tasks.
- **Task Assignment**: Assign tasks to multiple users.
- **JWT Authentication**: Secure routes with JWT tokens.
- **Task Filters**: Filter tasks by status and priority.
  
## Prerequisites

- Node.js v16 or higher
- MongoDB (Local or Remote Instance)

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/varshitha-008/Task_Management.git
    cd Task_Management
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Configure Environment Variables**:
    Create a `.env` file in the project root and add the following environment variables:
    ```env
    MONGO_URI=mongodb+srv://varshithab008:123@cluster0.zf2sm.mongodb.net/?retryWrites=true&w=majority
  JWT_SECRET=task;
  PORT=5000

4. **Start the server**:
    ```bash
    npm run dev
    ```

## API Routes

### Authentication Routes

- **Login**  
  `POST /api/auth/login`  
  Authenticate a user and retrieve a JWT token.
  
  **Request**:
  ```json
  {
    "email": "user@example.com",
    "password": "password"
  }
 **Response**

    {
    "token": "jwt_token"
    }


 ## Register

**Endpoint:** `POST /api/auth/register`

**Description:** Register a new user with name, email, and password.

**Request:**

     {
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password"
   }


 ## Task Routes

All task routes are protected by JWT, requiring the `Authorization: Bearer <token>` header.

### Create Task

**Endpoint:** `POST /api/tasks`

**Description:** Create a new task. Only the creator or admin can create tasks.

**Request:**

```json
{
  "title": "New Task",
  "description": "Task description",
  "priority": "medium",
  "status": "pending",
  "assignedTo": ["user_id1", "user_id2"]
}



### Get Task by ID

**Endpoint:** `GET /api/tasks/:id`

**Description:** Retrieve a specific task by its ID.

**Response:**

- **200 OK**

  ```json
  {
    "_id": "task_id",
    "title": "Task 1",
    "description": "Task description",
    "priority": "medium",
    "status": "pending",
    "assignedTo": ["user_id1", "user_id2"],
    "createdBy": "creator_id"
  }
  
  
  ### Update Task

**Endpoint:** `PUT /api/tasks/:id`

**Description:** Update task details. Only task creators or admins can update tasks.

**Request:**

```json
{
  "title": "Updated Task",
  "description": "Updated description",
  "priority": "high",
  "status": "in-progress"
}


## Task Routes

All task routes are protected by JWT, requiring the `Authorization: Bearer <token>` header.

### Delete Task

**Endpoint:** `DELETE /api/tasks/:id`

**Description:** Delete a task. Only task creators or admins can delete tasks.

**Responses:**

- **200 OK**

  ```json
  {
    "message": "Task deleted successfully"
  }


# Assign Task to Users

**Endpoint:** `PUT /api/tasks/:id/assign`

**Description:** Assign users to a task. Only task creators or admins can assign tasks.

**Request:**

```json
{
  "assignedTo": ["user_id1", "user_id2"]
}


## Authentication

All routes require authentication using JWT (JSON Web Token). The token must be passed in the `Authorization` header of every request.

**Header Format:**

```http
Authorization: Bearer <your_jwt_token>



## Error Handling

The API returns the following HTTP status codes for error handling:

- **400 Bad Request:** When an invalid request is made (e.g., invalid parameters).

  **Response Example:**
    
   - 400 Bad Request: When an invalid request is made (e.g., invalid parameters).
    401 Unauthorized: When the user is not authenticated or the token is invalid.
    403 Forbidden: When the user does not have permission to access the resource.
    404 Not Found: When the requested resource does not exist.
    500 Internal Server Error: When an unexpected error occurs on the server.





