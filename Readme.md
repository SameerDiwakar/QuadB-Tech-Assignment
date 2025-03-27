# QuadB Tech Assignment

## Setup and Run Locally

Follow these steps to clone the repository and run the project locally.

### 1. Clone the Repository
```sh
git clone https://github.com/SameerDiwakar/QuadB-Tech-Assignment.git
cd QuadB-Tech-Assignment
```

### 2. Run Backend Locally
```sh
cd backend
npm install
node server.js
```

### 3. Run Frontend Locally
```sh
cd frontend
npm install
npm run dev
```

### 4. Troubleshooting
If you face any issues with CORS, update the following:
- Change the **origin** link in `server.js` (backend) to the frontend's running link.
- Update **axios default baseURL** in `app.jsx` (frontend) to the backend's running link.
