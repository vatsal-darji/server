# **Basys AI Demo**

This project is a full-stack healthcare provider application where healthcare providers can manage patient health data and handle prior authorization workflows. The system includes a **patient dashboard**, **authentication with role-based access control**, and APIs to manage **prior authorization requests**.

---

## **Table of Contents**

1. [Features](#features)  
2. [Technologies Used](#technologies-used)  
3. [Prerequisites](#prerequisites)  
4. [Installation and Setup](#installation-and-setup)  
5. [Environment Variables](#environment-variables)  
6. [API Documentation](#api-documentation)  
7. [Usage Instructions](#usage-instructions)  
8. [Project Structure](#project-structure)  
9. [Testing](#testing)  
10. [Contributing](#contributing)

---

## **Features**

- **Authentication System**  
  - JWT-based login for healthcare providers and patients.
  - Role-based access control: only **providers** can access prior authorization APIs.
  
- **Patient Management**  
  - CRUD operations on patient data.
  - Secure password hashing using bcrypt.

- **Prior Authorization Workflow**  
  - Submission, listing, and management of authorization requests.
  - Each request stores the patient’s details, treatment, doctor notes, and request status.

- **Pagination**  
  - Pagination for listing patients and authorization requests to handle large datasets.

- **API Documentation**  
  - Swagger integrated for easy API testing and documentation.

---

## **Technologies Used**

- **Backend**: Node.js, Express.js, TypeScript, MongoDB  
- **Authentication**: JWT, bcrypt  
- **ORM**: Mongoose  
- **API Documentation**: Swagger  
- **Validation**: Joi 

---

## **Prerequisites**

Ensure you have the following installed:

1. **Node.js** (v16 or higher)
2. **MongoDB** (Running locally or using MongoDB Atlas)
3. **npm** or **yarn** (for package management)

---

## **Installation and Setup**

1. **Clone the repository**  
   ```bash
   git clone https://github.com/your-repo/healthcare-provider-portal.git
   cd healthcare-provider-portal
2. **Install dependencies**
   ``` bash
   npm i
3. **Start App**
   ``` bash
   npm run dev
