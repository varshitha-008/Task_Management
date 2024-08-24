# Task Management API

## Overview

This API provides a task management system with role-based access control. Users can manage tasks, with administrators having the ability to perform CRUD operations. The API includes user authentication, task management, and role-based permissions.

## Backend URL:
  https://task-management-wq3r.onrender.com



## Features

- **User Authentication**:
  - Register and log in users with JWT-based authentication.
  - Secure session management with token handling.
- **Task Management**:
  - Create, read, update, and delete tasks.
  - Task details include title, description, priority, status, and assigned user.
- **Role-Based Access Control**:
  - Only users with the role `admin` can perform CRUD operations on tasks.
  - Regular users can view tasks but cannot modify them.
- **Error Handling**:
  - Proper error responses for invalid requests and unauthorized access.
- **Sample Data**:
  - Includes example requests and responses for various endpoints.


## Tech Stacks 
    ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
    ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
    ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
    
     

## Backend Endpoints

### Auth Routes

- **POST /api/auth/register**
  - Register a new user.
  - Request body:
    ```json
        {
          "username":"Varshitha",
          "email":"varshithaa@gmail.com",
          "password":"123"
        }
            ```
  - Response:
    ```json
                  {
          "email": "varshithaa@gmail.com",
          "username": "Varshitha",
          "password": "$2b$10$8z8i43rF2V74l7JD7jiuw.TG5QkF2mJvGrqXvWwJhMfv4NzPyQpVa",
          "role": "user",
          "_id": "66c98b8540902abfc6f6000d",
          "__v": 0
        }
    ```

- **POST /api/auth/login**
  - Log in an existing user.
  - Request body:
    ```json
         {
          
          "email":"varshithaa@gmail.com",
          "password":"123"
        }
    ```
  - Response:
    ```json
        {
          "token": "access token"
        }
    ```


### Task Routes

- **POST /api/tasks**
  - Create a new task. Only accessible to users with the role `admin`.
  - Request body:
    ```json
        {
      "title": "Evaluation",
      "description": "Description of the new task",
      "status": "pending",
      "priority": "medium",
      "assignedTo": ["64d16c1c4bcf08bcd3deed88"]
    }

    ```
  - Response:
    ```json
          {
          "title": "Evaluation",
          "description": "Description of the new task",
          "status": "pending",
          "priority": "medium",
          "assignedTo": [
            "64d16c1c4bcf08bcd3deed88"
          ],
          "createdBy": "66c98b8540902abfc6f6000d",
          "_id": "66c98ed7ff856f4597a36dbd",
          "__v": 0
        }
    ```

- **GET /api/tasks**
  - Fetch all tasks. Includes optional filtering by priority, status, and assigned user.
  - Query parameters:
    - `priority`: Filter tasks by priority (e.g., `low`, `medium`, `high`).
    - `status`: Filter tasks by status (e.g., `pending`, `in progress`, `completed`).
    - `creator`: Filter tasks by creator and assigned to.
  - Response:
    ```json
        [
      {
        "_id": "66c98ed7ff856f4597a36dbd",
        "title": "Evaluation",
        "description": "Description of the new task",
        "status": "pending",
        "priority": "medium",
        "assignedTo": [],
        "createdBy": {
          "_id": "66c98b8540902abfc6f6000d",
          "email": "varshithaa@gmail.com",
          "username": "Varshitha",
          "password": "$2b$10$8z8i43rF2V74l7JD7jiuw.TG5QkF2mJvGrqXvWwJhMfv4NzPyQpVa",
          "role": "user",
          "__v": 0
        },
        "__v": 0
      }
    ]
    ```

- **GET /api/tasks/:id**
  - Fetch a specific task by its ID.
  - Request parameters:
    - `id`: The ID of the task to retrieve.
  - Response:
    ```json
        [
      {
        "_id": "66c98ed7ff856f4597a36dbd",
        "title": "Evaluation",
        "description": "Description of the new task",
        "status": "pending",
        "priority": "medium",
        "assignedTo": [],
        "createdBy": {
          "_id": "66c98b8540902abfc6f6000d",
          "email": "varshithaa@gmail.com",
          "username": "Varshitha",
          "password": "$2b$10$8z8i43rF2V74l7JD7jiuw.TG5QkF2mJvGrqXvWwJhMfv4NzPyQpVa",
          "role": "user",
          "__v": 0
        },
        "__v": 0
      }
    ]
    ```

- **PUT /api/tasks/:id**
  - Update a specific task by its ID. Only accessible to users with the role `admin`.
  - Request body:
    ```json
        {
        "title": "Evaluation1",
        "description": "Description of the new task",
        "status": "pending",
        "priority": "medium",
        "assignedTo": ["64d16c1c4bcf08bcd3deed88"]
      }

    ```
  - Response:
    ```json
        {
      "_id": "66c98ed7ff856f4597a36dbd",
      "title": "Evaluation1",
      "description": "Description of the new task",
      "status": "pending",
      "priority": "medium",
      "assignedTo": [
        "64d16c1c4bcf08bcd3deed88"
      ],
      "createdBy": {
        "_id": "66c98b8540902abfc6f6000d",
        "email": "varshithaa@gmail.com",
        "username": "Varshitha",
        "password": "$2b$10$8z8i43rF2V74l7JD7jiuw.TG5QkF2mJvGrqXvWwJhMfv4NzPyQpVa",
        "role": "user",
        "__v": 0
      },
      "__v": 2
    }
    ```

- **DELETE /api/tasks/:id**
  - Delete a specific task by its ID. Only accessible to users with the role `admin`.
  - Request parameters:
    - `id`: The ID of the task to delete.
  - Response:
    ```json
    {
      "message": "Task deleted"
    }
    ```

## Roles and Permissions

- **User**:
  - Can view tasks.
  
- **Admin**:
  - Can perform all CRUD operations on tasks.

