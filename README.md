# MessEase - A Modern Mess Management System

MessEase is a full-stack web application designed to simplify and automate the management of shared living expenses and meals. Built with the MERN stack (MongoDB, Express.js, React, Node.js), this application provides a robust, multi-tenant platform where different messes can manage their finances independently and transparently.

**Live Demo:** [Link to your deployed frontend on Vercel]

---

## Core Concept: Multi-Mess Architecture

Unlike simple expense trackers, MessEase is built on a multi-tenant architecture. This means the application can serve multiple, independent messes simultaneously, with each mess's data kept completely separate and secure.

- **Unique Mess Creation:** A new mess is created when a user registers as a **Manager**. They provide a unique mess name which acts as an identifier for their group.
- **Joining a Mess:** **Members** can join an existing mess by providing the exact mess name during their registration.
- **Scoped Data:** All data—including members, meals, expenses, schedules, and notices—is tied to a specific mess, ensuring privacy and data integrity between different groups.

---

## Key Features

The application provides distinct roles and features for both managers and members to ensure a smooth and efficient workflow.

### For All Users (Members & Managers)

* **Secure Authentication:** Users log in with their email, password, and unique mess name.
* **Dashboard Overview:** A personalized dashboard provides a quick summary of key statistics. Members see their personal meal counts, expenses, and balance, while managers see an overview of the entire mess's finances.
* **Monthly Settlement Report:** A detailed, transparent report showing each member's total meals, bazar expenses, meal costs, and final balance (whether they need to pay or receive money).
* **Notice Board:** A central place for communication. All members can view notices posted by the manager.
* **Profile Management:** Users can view and update their personal profile information.

### For Managers Only

* **Daily Meal Entry:** A simple interface to enter the daily meal count for every member of the mess. A single "Save All" button makes the process quick and efficient.
* **Expense Management:** A comprehensive module to add, edit, and delete all bazar expenses. The manager can select which member paid for a specific expense.
* **Bazar Schedule Management:** Managers can create and manage a monthly shopping (bazar) schedule, assigning duties to different members on specific dates.
* **Member Management:** Managers can view a list of all members in their mess and have the ability to promote a member to a manager or demote a manager back to a member.
* **Editable Settlement:** On the "Manage Settlement" page, managers have the ability to directly edit the total meal count for any member for the month, providing flexibility for corrections.
* **Post Notices:** Managers can post important announcements to the notice board, which are instantly visible to all members of their mess.
* **Start New Month:** A critical administrative feature that allows the manager to clear all transactional data (meals, expenses, schedules, and notices) for their mess, providing a clean slate for the next month.
* **PDF Report Download:** Managers can download the complete monthly settlement report as a PDF for record-keeping or offline sharing.

---

## Tech Stack

* **Frontend:** React (with Vite), Tailwind CSS
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **Authentication:** JSON Web Tokens (JWT)
* **Deployment:**
    * Backend deployed on **Render**
    * Frontend deployed on **Vercel**

---

## Local Setup and Installation

To run this project on your local machine, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone [your-repository-url]
    ```
2.  **Backend Setup:**
    ```bash
    cd backend
    npm install
    # Create a .env file with your MONGO_URI and JWT_SECRET
    npm run dev
    ```
3.  **Frontend Setup:**
    ```bash
    cd frontend
    npm install
    # Create a .env.local file with VITE_API_BASE_URL=http://localhost:4000/api
    npm run dev
    ```

The application will be running with the frontend on `http://localhost:5173` and the backend on `http://localhost:4000`.
