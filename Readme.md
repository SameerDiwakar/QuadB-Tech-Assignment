# QuadB Tech Assignment

## Live Demo  
Check out the live project: [QuadB Tech Assignment](https://quadb-tech-assignment-1.onrender.com/)  

> **Note:** Since the project is deployed on a free plan, the server may take some time to wake up. If the link doesn't work on the first attempt, try refreshing or navigating between pages 2-3 times.  


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
